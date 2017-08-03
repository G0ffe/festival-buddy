const Festival = require('./festival.model');
const getFestivals = (req, res) => {
  Festival.find()
    .then(festivals => {
      res.json({
        festivals: festivals.map(festival => festival.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const createFestival = (req, res) => {
  console.log(req.body);
  const requiredFields = ['name', 'date', 'time', 'location'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing '${field}' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Festival.create({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location
  })
    .then(festival => res.status(201).json(festival.apiRepr()))
    .catch(err => {
      res.status(500).json(err);
    });
};

const getFestival = (req, res) => {
  Festival.findById(req.params.id)
    .then(festival => res.json(festival.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateFestival = (req, res) => {
  const toUpdate = {};
  const updateableFields = ['name', 'date', 'time', 'location'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Festival.findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(festival => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};

const deleteFestival = (req, res) => {
  Festival.findByIdAndRemove(req.params.id)
    .then(festival => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Inter server error' }));
};

module.exports = {
  getFestivals,
  createFestival,
  getFestival,
  updateFestival,
  deleteFestival
};
