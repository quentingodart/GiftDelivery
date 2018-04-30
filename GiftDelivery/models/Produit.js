var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var ProductSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  description: {
        type: String,
        unique: true,
        required: true
    },
  image: {
        type: String,
        unique: true,
        required: true
    },
  price: {
        type: Number,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);
