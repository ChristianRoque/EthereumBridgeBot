const Web3 = require("web3");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

let web3 = new Web3(
  // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURAKEY
  )
);

exports.fetchData = function (req, res) {};
