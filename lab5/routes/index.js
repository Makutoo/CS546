const peopleRoutes = require('./people');
const workRoutes = require('./work')

const constructorMethod = (app) => {
  app.use('/people', peopleRoutes);
  app.use('/work', workRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;