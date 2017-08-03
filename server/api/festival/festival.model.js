const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
  name: { type: String, require: true },
  date: { type: Date, require: true },
  time: { type: String, require: true },
  location: { type: String, require: true }
});

festivalSchema.methods.apiRepr = function() {
  return {
    id: this.id,
    name: this.name,
    date: this.date,
    time: this.time,
    location: this.location
  };
};

module.exports = mongoose.model('Festival', festivalSchema);
