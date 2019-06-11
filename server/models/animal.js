var mongoose = require('mongoose');
var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    type: {type: String, required: true, minlength: 3},
    age: {type: Number, required: true},
    hobby: {type: String, required: true, minlength: 4},
    power: {type: String, required: true, minlength: 4},
}, {timestamps: true });

mongoose.model('Animal', AnimalSchema);
module.exports = mongoose.model("Animal", AnimalSchema);