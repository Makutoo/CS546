const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
module.exports = {
    async get(id) {
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) {
            throw 'Id cannot be an empty string or just spaces';
        }
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        const bandCollection = await bands();
        let band = await bandCollection.findOne({ _id: ObjectId(id) });
        if (band === null) throw 'No band with that id';
        band._id = band._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") //Reference: https://stackoverflow.com/questions/69410510/how-to-remove-new-objectid-from-the-display-of-json-data 
        return band;
    },

    async getAll() {
        const bandCollection = await bands();
        let bandList = await bandCollection.find({}).toArray();
        if (!bandList) throw 'Could not get all dogs';
        bandList.forEach(band => {
            band._id = band._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") //Reference: https://stackoverflow.com/questions/69410510/how-to-remove-new-objectid-from-the-display-of-json-data 
        });
        return bandList
    },

    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        if(!name) throw 'You must name'
        if(!genre) throw 'You must genre'
        if(!website) throw 'You must website'
        if(!recordLabel) throw 'You must recordLabel'
        if(!bandMembers) throw 'You must bandMembers'
        if(!yearFormed) throw 'You must yearFormed'

        if(typeof(name) !== 'string') throw 'Name is not a string'
        if (name.trim().length === 0) {
            throw 'name cannot be an empty string or just spaces';
        }

        if(typeof(website) !== 'string') throw 'website is not a string'
        if (website.trim().length === 0) {
            throw 'website cannot be an empty string or just spaces';
        }

        if(typeof(recordLabel) !== 'string') throw 'recordLabel is not a string'
        if (recordLabel.trim().length === 0) {
            throw 'recordLabel cannot be an empty string or just spaces';
        }
        name = name.trim();
        website = website.trim();
        recordLabel = recordLabel.trim();

        if(!website.startsWith("http://www.")) {
            throw 'webstie does not start with http://www.'
        }
        if(!website.endsWith(".com")) {
            throw 'webstie does not end with .com'
        }
        if(website.substring(11, website.length - 4).length < 5) {
            throw 'There needs to be 5 characters between http://www. And .com'
        }

        if(!Array.isArray(genre)) {
            throw 'genre must be an arrays'
        }

        if(!Array.isArray(bandMembers)) {
            throw 'bandMembers must be an arrays'
        }
        if(genre.length < 1) {
            throw 'genre must have at least one element'
        }
        if(bandMembers.length < 1) {
            throw 'bandMembers must have at least one element'
        }
        genre.forEach(element => {
            if(typeof(element) !== 'string') {
                throw 'some element in genre is not a string'
            }
            if(element.trim().lenght == 0) {
                throw 'some element in genre is empty string'
            }
            element = element.trim();
        });

        bandMembers.forEach(element => {
            if(typeof(element) !== 'string') {
                throw 'some element in bandMembers is not a string'
            }
            if(element.trim().lenght == 0) {
                throw 'some element in bandMembers is empty string'
            }
            element = element.trim();
        });
        if(typeof(yearFormed) !== 'number') {
            throw 'yearFormed is not a number'
        }
        if(yearFormed < 1900 || yearFormed > 2022) {
            throw 'yearFromed is not Vaild (only years 1900-2022 are valid values)'
        }

        const bandCollection = await bands();
        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed:yearFormed
        }
        const insertInfo = await bandCollection.insertOne(newBand);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw 'Could not add band';
        }
        const newId = insertInfo.insertedId.toString();
        return  await this.get(newId);
    },

    async remove(id) {
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) {
            throw 'id cannot be an empty string or just spaces';
        }
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        const bandCollection = await bands();
        const band = await this.get(id)
        const band_name = band.name
        const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete band with id of ${id}`;
        }
        return band_name + ' has been successfully deleted!'
    },

    async rename(id, newName) {
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) {
            throw 'id cannot be an empty string or just spaces';
        }
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (!newName) throw 'You must provide a new Name';
        if (typeof newName !== 'string') throw 'new Name must be a string';
        if (newName.trim().length === 0) {
            throw 'new Name cannot be an empty string or just spaces';
        }
        newName = newName.trim();
        const bandCollection = await bands();
        const band = await bandCollection.findOne({ _id: ObjectId(id) })
        if (band === null) throw 'No band with that id';
        const band_name = band.name
        if(band_name === newName) {
            throw 'new Name is same as the current name stored in the database'
        }
        let updatedBand = {
            name: newName,
            genre: band.genre,
            website: band.website,
            recordLabel: band.recordLabel,
            bandMembers: band.bandMembers,
            yearFormed: band.yearFormed
        }

        const updatedInfo = await bandCollection.replaceOne(
            { _id: ObjectId(id) },
            updatedBand
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update post successfully';
        }
        return await this.get(id);
    }
    
}