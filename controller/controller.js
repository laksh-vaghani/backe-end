const QRCode = require('qrcode');
const Success = require('../Modules/modules')



const Qrget = async (req, res) => {
    try {
        const data = Math.floor(100000 + Math.random() * 900000).toString();
        const URL = `http://localhost:3001/success?code=${data}`;

        const qrCodeImage = await QRCode.toDataURL(URL);
        console.log(data);


        res.status(200).json({ data, qrCodeImage });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
};

const SuccessPost = async (req, res) => {
    const { success, code } = req.body;
    console.log('Success:', success, 'Code:', code);

    const newSuccess = new Success({ code: code, success: success });
    newSuccess.save()
        .then(() => {
            console.log('Data saved successfully');
            res.status(200).json({ message: 'Success recorded' });
        })
        .catch((err) => {
            console.error('Error saving data:', err);
            res.status(500).send('Internal Server Error');
        });
}


const SuccessGet = async (req, res) => {
    try {
        const data = await Success.find();
        console.log('Retrieved data:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    Qrget,
    SuccessPost,
    SuccessGet,
};
