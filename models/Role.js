const { Schema, model } = require('mongoose')

const Role = new Schema({
    value: {type: String, default: 'USER', unique: true, require: true}
})
   

module.exports = model('Role', Role)