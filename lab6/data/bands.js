const mongoCollections = require('../config/mongoCollections');
const inputCheck = require('../inputCheck');
const bands = mongoCollections.bands;
const albums = mongoCollections.albums;
//const albums = require('./albums');
const { ObjectId } = require('mongodb');



async function getAllAlbumsAndRemove(band) {
    const albumCollection = await albums();
    band.albums.forEach(async (album) => {
        albumCollection.deleteOne({ _id: ObjectId(album._id) });
    });
}

module.exports = {
    async get(id) {
        id = inputCheck.checkIdIsVaild(id);
        const bandCollection = await bands();
        let band = await bandCollection.findOne({ _id: ObjectId(id) });
        if (band === null) throw 'No band with that id';
        band._id = band._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") //Reference: https://stackoverflow.com/questions/69410510/how-to-remove-new-objectid-from-the-display-of-json-data 
        return band;
    },

    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        try {
            name = inputCheck.checkNameIsVaild(name);
            genre = inputCheck.checkGenreIsVaild(genre);
            website = inputCheck.checkWebsiteIsVaild(website);
            recordLabel = inputCheck.checkRecordLabelIsVaild(recordLabel);
            bandMembers = inputCheck.checkBandMembers(bandMembers);
            yearFormed = inputCheck.checkYearFormed(yearFormed);
        }catch(e) {
            throw e
        }
        const bandCollection = await bands();
        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed:yearFormed,
            albums: [],
            overallRating: 0
        }
        const insertInfo = await bandCollection.insertOne(newBand);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw 'Could not add band';
        }
        const newId = insertInfo.insertedId.toString();
        return  await this.get(newId);
    },
    async getAll() {
        const bandCollection = await bands();
        let bandList = await bandCollection.find({}).toArray();
        if (!bandList) throw 'Could not get all bands';
        bandList.forEach(band => {
            band._id = band._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") //Reference: https://stackoverflow.com/questions/69410510/how-to-remove-new-objectid-from-the-display-of-json-data 
        });
        return bandList
    },

    async remove(id) {
        id = inputCheck.checkIdIsVaild(id);
        const bandCollection = await bands();
        const band = await this.get(id)
        const band_name = band.name
        await getAllAlbumsAndRemove(band)
        const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete band with id of ${id}`;
        }
        return band_name + ' has been successfully deleted!'
    },

    async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
        try {
            id = inputCheck.checkIdIsVaild(id);
            name = inputCheck.checkNameIsVaild(name);
            genre = inputCheck.checkGenreIsVaild(genre);
            website = inputCheck.checkWebsiteIsVaild(website);
            recordLabel = inputCheck.checkRecordLabelIsVaild(recordLabel);
            bandMembers = inputCheck.checkBandMembers(bandMembers);
            yearFormed = inputCheck.checkYearFormed(yearFormed);
        }catch(e) {
            throw e
        }

        const bandCollection = await bands();
        const band = await bandCollection.findOne({ _id: ObjectId(id) })
        if (band === null) throw 'No band with that id';

        let updatedBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: band.albums,
            overallRating: band.overallRating
        }

        const updatedInfo = await bandCollection.replaceOne(
            { _id: ObjectId(id) },
            updatedBand
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update post successfully';
        }
        return await this.get(id);
    },

    async updateRating(bandId) {
        let band = await this.get(bandId)
        const bandCollection = await bands()
        let albums = band.albums
        let sum = 0;
        albums.forEach(object => {
            sum += object.rating
        });
        let avg = undefined
        if(albums.length == 0) {
            avg = 0;
        }else {
            avg = sum / albums.length
        }
        const updateInfo = await bandCollection.updateOne(
            { _id: ObjectId(bandId) },
            { $set: {overallRating:avg }}
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';
        
    },
    async addAlubmToBand(bandId, album) {
        const bandCollection = await bands()
        
        const updateInfo = await bandCollection.updateOne(
            {_id: ObjectId(bandId)},
            { $push: { albums: album}}
        )
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount){
            throw 'Update failed';
        }
        await this.updateRating(bandId);
    },

    async removeAlbumFromBand(bandId, albumId) {
        const bandCollection = await bands()
        const updateInfo = await bandCollection.updateOne(
            { _id: ObjectId(bandId) },
            { $pull: { albums: { _id: albumId } } }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw 'Update failed';
        await this.updateRating(bandId)
        return await this.get(bandId);
    }
    
};
