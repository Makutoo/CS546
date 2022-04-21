const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people
const validation = require('../data/validation');

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
      const person = await peopleData.getPersonById(req.params.id);
      res.json(person);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    res.send(`POST request to http://localhost:3000/people/${req.params.id}`);
  })
  .delete(async (req, res) => {
    res.send(`DELETE request to http://localhost:3000/people/${req.params.id}`);
  });

  router
  .route('/')
  .get(async (req, res) => {
    try {
      const people = await peopleData.getAllPeople();
      res.json(people);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    res.send('POST request to http://localhost:3000/people');
  })
  .delete(async (req, res) => {
    res.send('DELETE request to http://localhost:3000/people');
  });

  module.exports = router;