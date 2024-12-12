const { default: mongoose } = require("mongoose");

const successSchema = new mongoose.Schema({
    code:{
        type: 'string',
    },
    connectionStatus:{
        type: 'boolean',    
    }
})
const Connection = mongoose.model('connection', successSchema);
module.exports = Connection;