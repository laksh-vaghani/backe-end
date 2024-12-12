const QrCode = require('qrcode')
const Connection = require('../../Modules/Modules')
const GetQrCode = async (req, res) => {
  try {

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const URL = `https://front-end-hn5g.vercel.app/show-case?code=${code}`;
    const qrCodeImage = await QrCode.toDataURL(URL);
    res.status(200).json({ code, qrCodeImage });

  } catch (error) {

    console.error('Error generating QR code:', error);
    res.status(500).send('Internal Server Error');

  }
}

const PostConnectedCode = async (req, res) => {
  try {
    const code = req.query.code;
    if (code) {
      const isConnected = true
      const newConnection = new Connection({ code: code, connectionStatus: isConnected });
      newConnection.save()
      console.log(isConnected)
    } else {
      res.status(400).json({ error: "Code query parameter is required" });
      return;
    }
    console.log("Received code:", code);
    res.status(200).json({ message: "Code received successfully", code });

  } catch (error) {
    console.error("Error handling PostConnectedCode:", error);
    res.status(500).send("Internal Server Error");
  }
};

const GetConnectionStatus = () => {

}


const DeleteCodeOnRefresh = async (req, res) => {
  try {
    const code = req.query.code; // Get the code from the query parameters

    if (!code) {
      return res.status(400).json({ error: "Code query parameter is required" });
    }

    // Find and delete the code document in the database
    const result = await Connection.deleteOne({ code });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Code not found" });
    }

    res.status(200).json({ message: "Code deleted successfully" });
  } catch (error) {
    console.error("Error deleting code:", error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  GetQrCode,
  PostConnectedCode,
  GetConnectionStatus,
  DeleteCodeOnRefresh
}