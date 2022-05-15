const detailsRoutes = require('./details');
const searchRoutes = require('./search')
const path = require('path');

const constructorMethod = (app) => {
  app.use('/show', detailsRoutes);
  app.use('/searchshows', searchRoutes);
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('static/mv.html'));
  });
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;