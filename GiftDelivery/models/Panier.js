var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var BasketSchema = new Schema({
  productList: {
        type: [],
        unique: true,
        required: true
    },
    totalPrice: {
      type : Number,
      unique : true,
      required : true
    }
});

module.exports = mongoose.model('Basket', BasketSchema);
