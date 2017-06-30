const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
    name: { type: String, require: true },
    date: { type: String, require: true },
    location: { type: String, require: true }
});

festivalSchema.methods.apiRepr = function () {

    return {
        id: this.id,
        name: this.name,
        date: this.date,
        location: this.location
    };
}

const Festival = mongoose.model('Festival', festivalSchema);

module.exports = { Festival }