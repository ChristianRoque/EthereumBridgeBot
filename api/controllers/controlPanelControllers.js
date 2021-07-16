const Web3 = require("web3");
const path = require("path");
import { Transaction } from "@ethereumjs/tx";

require("dotenv").config({ path: path.join(__dirname, "../.env") });

let web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURAKEY
  )
);

const account = "<account address>";
const anyPrivateKey = Buffer.from("<Private Key>", "hex");

const abi = path.join(__dirname, "<../anyABI.json>");
const contract_Address = "<Contract address>";
const contract = new web3.eth.contract(abi, contract_Address);

let myData = contract.methods.anyMethod("<anyParam>").encodeABI();

web3.eth.getTransactionCount(account, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: contract_Address,
    value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: myData,
  };

  const common = new Common({ chain: "mainnet" });
  const tx = Transaction.fromTxData(txObject, { common });

  tx.sign(anyPrivateKey);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});

exports.fetchData = function (req, res) {};
