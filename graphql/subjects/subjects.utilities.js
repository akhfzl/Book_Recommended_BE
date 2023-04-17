const StudentModel = require('../students/student.model');

async function generateAggregateQuery(limit, page){
    const target = await StudentModel.aggregate([
        {
            $addFields: {
                full_name: {
                    $concat: ['$civility', ' ','$first_name', ' ', '$last_name']
                }
            }
        },
        {
            $lookup: {
                from: 'subjects',
                localField: 'rncp_title',
                foreignField: 'rncp_title',
                as: 'subjects'
            }
        },
        {
            $match: {
                status: 'active',
                'subjects.books': {
                    $not: {
                        $size:0
                    }
                }
            }
        },
        {
            $skip: page * limit
        },
        {
            $limit: limit
        },
        {
            $unwind: '$subjects'
        },
        {
            $unwind: '$subjects.books'
        },
        {
            $addFields: {
                title: '$subjects.books.title'
            }
        },
        {
            $addFields: {
                subject_name: '$subjects.subject_name'
            }
        },
        {
            $addFields: {
                category: '$subjects.books.category'
            }
        },
        {
            $project: {
                _id: 1,
                full_name:1,
                subject_name:1,
                title:1,
                category:1
            }
        }
    ]).allowDiskUse(true);
    return target
}

module.exports = {
    generateAggregateQuery
}