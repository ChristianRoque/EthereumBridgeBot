const Web3 = require("web3");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

let web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURAKEY
  )
);

exports.fetchData = function (req, res) {};
