const festivalRouter = require('../api/festival/festival.router');

module.exports = function(app) {
  app.use('/festivals', festivalRouter);

  /* -------------- CATCH ALL -------------- */
  app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
  });
};
