const festivalRouter = require('../api/festival/festival.router');
const path = require('path');

module.exports = function(app) {
  app.use('/festivals', festivalRouter);

  /* -------------- CATCH ALL -------------- */
  app.use('*', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, '../../', './client/index.html'))
  });
};
