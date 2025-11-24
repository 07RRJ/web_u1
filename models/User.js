const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  lista: { type: String, required: true },       // Länets namn
  lista2: { type: String, required: true },      // Residensstad
});

module.exports = mongoose.model('User', userSchema);