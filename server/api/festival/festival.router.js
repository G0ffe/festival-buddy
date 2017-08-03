const router = require('express').Router();
const {
  getFestivals,
  createFestival,
  getFestival,
  updateFestival,
  deleteFestival
} = require('./festival.controller');

router.route('/').get(getFestivals).post(createFestival);
router
  .route('/:id') //festivals/:id
  .get(getFestival)
  .put(updateFestival)
  .delete(deleteFestival);

module.exports = router;
