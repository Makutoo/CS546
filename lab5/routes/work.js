const express = require('express');
const router = express.Router();
const data = require('../data');
const workData = data.work
const validation = require('../data/validation');

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
      const company = await workData.getCompanyById(req.params.id);
      res.json(company);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    res.send(`POST request to http://localhost:3000/work/${req.params.id}`);
  })
  .delete(async (req, res) => {
    res.send(`DELETE request to http://localhost:3000/work/${req.params.id}`);
  });

  router
  .route('/')
  .get(async (req, res) => {
    try {
      const companies = await workData.getAllCompany();
      res.json(companies);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    res.send('POST request to http://localhost:3000/work');
  })
  .delete(async (req, res) => {
    res.send('DELETE request to http://localhost:3000/work');
  });

  module.exports = router;