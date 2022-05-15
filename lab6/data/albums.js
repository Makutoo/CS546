const mongoCollections = require('../config/mongoCollections');
const inputCheck = require('../inputCheck');
const albums = mongoCollections.albums;
const { ObjectId } = require('mongodb');
const bands = require('./bands');

module.exports = {
    async get(albumId) {
        albumId = inputCheck.checkIdIsVaild(albumId);
        const albumCollection = await albums();
        let album = await albumCollection.findOne({ _id: ObjectId(albumId) });
        if (album === null) throw 'No album with that id';
        //album._id = album._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") //Reference: https://stackoverflow.com/questions/69410510/how-to-remove-new-objectid-from-the-display-of-json-data 
        return album;
    },
    
    async create(bandId, title, releaseDate, tracks, rating) {
        try {
            bandId = inputCheck.checkIdIsVaild(bandId);
            title = inputCheck.checkTitleIsVaild(title);
            releaseDate = inputCheck.checkReleaseDateIsVaild(releaseDate);
            tracks = inputCheck.checkTracksIsVaild(tracks);
            rating = inputCheck.checkRatingIsVaild(rating);
        }catch(e) {
            throw e
        }
        const albumCollection = await albums();
        const newAlbum = {
            title: title,
            releaseDate: releaseDate,
            tracks: tracks,
            rating: rating,
            bandId: bandId
        };
        const newInsertInformation = await albumCollection.insertOne(newAlbum);
        const newId = newInsertInformation.insertedId.toString();
        await bands.addAlubmToBand(bandId, await this.get(newId));
        return await this.get(newId);
    },

    async getAll(bandId) {
        let band = await bands.get(bandId)
        return band.albums
    },

    async remove(albumId) {
        albumId = inputCheck.checkIdIsVaild(albumId);
        const albumCollection = await albums();
        let album = null
        try {
            album = await this.get(albumId);
          } catch (e) {
            console.log(e);
            return;
        }
        const deletionInfo = await albumCollection.deleteOne({ _id: ObjectId(albumId) });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete album with id of ${albumId}`;
        }
        return await bands.removeAlbumFromBand(album.bandId, albumId);
    }
}