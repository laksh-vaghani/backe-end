const express = require('express');
const app = express();
const {
    GetQrCode,
    PostConnectedCode,
    GetConnectionStatus,
    DeleteCodeOnRefresh
} = require('../Controller/Qr-Connation/Controller')

app.get('/qr-code', GetQrCode)
app.post('/connected-code', PostConnectedCode)
app.get('/connection-status', GetConnectionStatus)
app.delete('/refreshed-page', DeleteCodeOnRefresh)
module.exports = app