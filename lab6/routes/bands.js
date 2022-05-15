const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const validation = require('../inputCheck')
router.use(express.json())

router
  .route('/')
  .get(async (req, res) => {
    try {
      const allBands = await bandData.getAll();
      let bs = []
      allBands.forEach(band => {
          var obj = {"_id": band._id, "name": band.name};
          bs.push(obj);
      });
      res.json(bs);
    } catch (e) {
      res.status(404).json(e);
    }
  })    
  .post(async (req, res) => {
    let bandBody = req.body
    if(!bandBody) {
        res.status(400).json({error : 'You must provide data to create a band'})
        return
    }

    let name = undefined
    let genre = undefined
    let website = undefined
    let recordLabel = undefined
    let bandMembers = undefined
    let yearFormed = undefined

    try {
        name = validation.checkNameIsVaild(bandBody.name)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        genre = validation.checkGenreIsVaild(bandBody.genre)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        website = validation.checkWebsiteIsVaild(bandBody.website)
    }catch(e) {
        res.status(400).json(e);
        return
    }
    
    try {
        recordLabel = validation.checkRecordLabelIsVaild(bandBody.recordLabel)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        recordLabel = validation.checkRecordLabelIsVaild(bandBody.recordLabel)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        bandMembers = validation.checkBandMembers(bandBody.bandMembers)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        yearFormed = validation.checkYearFormed(bandBody.yearFormed)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        const newBand = await bandData.create(name, genre, website, recordLabel, bandMembers, yearFormed)
        res.json(newBand);
    }catch (e) {
        res.sendStatus(500)
        return
    }
  })
  .delete(async (req, res) => {
    res.send(`DELETE request to http://localhost:3000/bands/`);
  });


  router
  .route('/:id')
  .get(async (req, res) => {
    try {
        req.params.id = validation.checkIdIsVaild(req.params.id);
        const myBand = await bandData.get(req.params.id);
        res.json(myBand);
      } catch (e) {
        res.status(404).json(e);
    }
  })
  .put(async (req, res) => {
    let id = undefined
    try { //Check Id is Vaild
        id = validation.checkIdIsVaild(req.params.id);
      } catch (e) {
        res.status(404).json(e);
        return
    }

    try {//Check band exisit
        const theBand = await bandData.get(id);
      } catch (e) {
        res.status(404).json(e);
        return
    }


    let bandBody = req.body

    let name = undefined
    let genre = undefined
    let website = undefined
    let recordLabel = undefined
    let bandMembers = undefined
    let yearFormed = undefined

    try {
        name = validation.checkNameIsVaild(bandBody.name)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        genre = validation.checkGenreIsVaild(bandBody.genre)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        website = validation.checkWebsiteIsVaild(bandBody.website)
    }catch(e) {
        res.status(400).json(e);
        return
    }
    
    try {
        recordLabel = validation.checkRecordLabelIsVaild(bandBody.recordLabel)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        recordLabel = validation.checkRecordLabelIsVaild(bandBody.recordLabel)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        bandMembers = validation.checkBandMembers(bandBody.bandMembers)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        yearFormed = validation.checkYearFormed(bandBody.yearFormed)
    }catch(e) {
        res.status(400).json(e);
        return
    }

    try {
        const updateBand = await bandData.update(id, name, genre, website, recordLabel, bandMembers, yearFormed)
        res.json(updateBand);
    }catch (e) {
        res.sendStatus(500)
        return
    }
  })
  .delete(async (req, res) => {
    let id = undefined
    try {
        id = validation.checkIdIsVaild(req.params.id);
      } catch (e) {
        res.status(400).json(e);
        return
    }

    try {
        await bandData.get(id);
      } catch (e) {
        res.status(404).json({ error: 'Band not found' });
        return;
    }

    try {
        await bandData.remove(req.params.id);
        let deleteMessage = {"bandId": id, "delete": true}
        res.status(200).json(deleteMessage);
      } catch (e) {
        res.sendStatus(500);
    }

  });

module.exports = router;