const DataLoader = require('dataloader');
const {RncpModel} = require('./rncp.model')

const rncpCall = async (rncpIds) => {
    const rncp = await RncpModel.find({status:'active', _id: {$in: rncpIds }})
    let obj = {}
    rncp.forEach(val => {
        obj[val._id] = val
    })
    return rncpIds.map(id => obj[id]);
}

const rncpTitleLoader = new DataLoader(rncpCall);

module.exports = { rncpTitleLoader }