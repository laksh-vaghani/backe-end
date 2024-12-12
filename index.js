const express = require('express');
const app = express();
const port = 1257;
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./Routes/Routes');
app.use(express.json());
app.use(cors())

app.use('/',user)
mongoose.connect('mongodb://localhost:27017/chat_data').then(()=>{
    console.log('database connection established')
})

app.listen(port,() => {
    console.log('listening on port ' + port);
});