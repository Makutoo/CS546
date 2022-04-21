const bands = require('./data/bands');
const connection = require('./config/mongoConnection');
const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    //defining these here so I can use them later in the function
    let band1 = undefined
    let band2 = undefined
    let band3 = undefined
    let badBand = undefined

    console.log("1. Create a band && 2. Log the newly created band. (Just that band, not all bands)"); 
    try {
        band1 = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log('First band has added');
        console.log(band1);
      } catch (e) {
        console.log(e);
    }
    console.log("3. Create another band");
    try {
        band2 = await bands.create('The Beatles', ["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com", "Parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
        console.log('another band has added');
    } catch (e) {
        console.log(e);
    }
    console.log("4. Query all bands");
    try {
        const bandList = await bands.getAll();
        console.log(bandList);
    } catch (e) {
        console.log(e);
    }
    console.log("5. Create the 3rd band && 6. Log the newly created 3rd band. (Just that band, not all bands)");
    try {
        band3 = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"],"http://www.linkinpark.com", "Warner",["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996);
        console.log('3rd band has added');
        console.log(band3);
    } catch (e) {
        console.log(e);
    }
    console.log('7. Rename the first band && 8. Log the first band with the updated name');
    try {
        const updatedBand = await bands.rename(band1._id, "Lennon's Boys");
        console.log('first band has been renamed')
        console.log(updatedBand)
    } catch (e) {
        console.log(e);
    }
    
    console.log('9. Remove the second band')
    try {
        const removeStatus = await bands.remove(band2._id);
        console.log(removeStatus);
    } catch (e) {
        console.log(e);
    }
    console.log("10. Query all bands, and log them all");
    try {
        const bandList = await bands.getAll();
        console.log(bandList);
    } catch (e) {
        console.log(e);
    }
    console.log("11. Try to create a band with bad input parameters to make sure it throws errors.");
    try {
        badBand = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www..com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log('fail case did not fail');
      } catch (e) {
        console.log(e);
    }
    console.log('12. Try to remove a band that does not exist to make sure it throws errors.') 
    try {
        const removeStatus = await bands.remove('52085493de401830f2aa4049');
        console.log('fail case did not fail');
    } catch (e) {
        console.log(e);
    }
    console.log('13. Try to rename a band that does not exist to make sure it throws errors.')
    try {
        const updatedBand = await bands.rename('52085493de401830f2aa4049', "Lennon's Boys");
        console.log('fail case did not fail');
    } catch (e) {
        console.log(e);
    }
    console.log('14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.')
    try {
        const updatedBand = await bands.rename(band1._id, await (await bands.get(band1._id)).name);
        console.log('fail case did not fail');
    } catch (e) {
        console.log(e);
    }
    console.log('15. Try getting a band by ID that does not exist to make sure it throws errors.')
    try {
        const getBand = await bands.get('52085493de401830f2aa4049')
        console.log('fail case did not fail');
    }catch (e) {
        console.log(e);
    }
    await connection.closeConnection();
    console.log('Done!');
}

main()