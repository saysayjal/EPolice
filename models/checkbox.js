const mongoose = require('mongoose');

const checkboxSchema = new mongoose.Schema({
    myCheckbox: Boolean,
  });
  
  const Checkbox = mongoose.model('Checkbox', checkboxSchema);

module.exports = Checkbox;
