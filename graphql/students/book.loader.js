const DataLoader = require('dataloader');
const { BookModel, BookRecommenderModel } = require('../subjects/subjects.model')

const BookDefault = async(bookIds) => {
    let book = await BookModel.find({
        _id: {
            $in: bookIds
        },
        status: 'active'
    })
    let obj = {}
    book.forEach(val => {
        obj[val._id] = val
    })
    return bookIds.map(id => obj[id]);
}

const BookRecommend = async(bookIds) => {
    let book = await BookRecommenderModel.find({
        _id: {
            $in: bookIds
        },
        status: 'active'
    })
    let obj = {}
    book.forEach(val => {
        obj[val._id] = val
    })
    return bookIds.map(id => obj[id]);
}

const bookDefault = new DataLoader(BookDefault);
const bookRecommend = new DataLoader(BookRecommend)

module.exports = { bookDefault, bookRecommend }