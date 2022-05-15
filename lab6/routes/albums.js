const express = require('express');
const router = express.Router();
const data = require('../data');
const validation = require('../inputCheck')
const albumData = data.albums
const bandData = data.bands;
router.use(express.json())

router
  .route('/:id')
  .get(async (req, res) => {
    try { //if the bandId is not a valid ObjectId
        req.params.id = validation.checkIdIsVaild(req.params.id);
    } catch (e) {
        res.status(400).json(e);
        return
    }

    let band = null

    try { //if the bandId is not found in the system
        band = await bandData.get(req.params.id) 
    } catch (e) {
        res.status(404).json(e);
        return
    }

    try { //If no albums for the bandId are found
      const allAlbums = await albumData.getAll(req.params.id);
      if(allAlbums.length === 0) {
          res.status(404).json('no albums for the bandId')
          return
      }
      res.json(allAlbums); 
    } catch (e) {
      res.status(500).json(e);
    }
  })

  .post(async (req, res) => {
    const albumBody = req.body;
    let bandId = undefined
    try {
      bandId = validation.checkIdIsVaild(req.params.id);
      } catch (e) {
        res.status(400).json(e);
        return
    }
    
    try {//Check band exisit
      const theBand = await bandData.get(bandId);
    } catch (e) {
      res.status(404).json(e);
      return
    }

    let title = undefined
    let releaseDate = undefined
    let tracks = undefined
    let rating = undefined
    try {
      title = validation.checkTitleIsVaild(albumBody.title)
    }catch(e) {
      res.status(400).json(e);
    return
    }

    try {
      releaseDate = validation.checkReleaseDateIsVaild(albumBody.releaseDate)
    }catch(e) {
      res.status(400).json(e);
    return
    }

    try {
      tracks = validation.checkTracksIsVaild(albumBody.tracks)
    }catch(e) {
      res.status(400).json(e);
    return
    }
    
    try {
      rating = validation.checkRatingIsVaild(albumBody.rating)
    }catch(e) {
      res.status(400).json(e);
    return
    }

    try {
      const newAlbum = await albumData.create(bandId, title, releaseDate, tracks, rating)
      const myBand = await bandData.get(bandId)
      res.json(myBand);
      } catch (e) {
        res.status(500).json({ error: e });
      }
  })
  .delete(async (req, res) => {
    let albumeId = undefined
    try {
      albumeId = validation.checkIdIsVaild(req.params.id);
      } catch (e) {
        res.status(400).json(e);
        return
    }
    try{
      myAlbum = await albumData.get(albumeId)
    } catch(e) {
      res.status(404).json(e)
      return
    }

    try {
      await albumData.remove(albumeId);
      let deleteMessage = {"albumId": albumeId, "delete": true}
      res.status(200).json(deleteMessage);
    } catch (e) {
      res.sendStatus(500);
  }
  });

router
  .route('/album/:id')
  .get(async (req, res) => {
    let albumId = undefined
    try {
      albumId = validation.checkIdIsVaild(req.params.id);
    } catch (e) {
      res.status(400).json(e);
      return
    }
    try {
        const myAlbum = await albumData.get(albumId);
        res.json(myAlbum);
    }catch(e) {
        res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    res.send(`POST request to http://localhost:3000/albums/album/${req.params.id}`);
  })
  .delete(async (req, res) => {
    res.send(`DELETE request to http://localhost:3000/albums/album/${req.params.id}`);
  });
module.exports = router;