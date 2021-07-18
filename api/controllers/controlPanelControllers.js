const Web3 = require("web3");
const path = require("path");
const ethereum = require("@ethereumjs/tx");
const Transaction = ethereum.Transaction;
const contractJSON = require("../abis/Bank.json");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

let web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_KEY
  )
);

const account = process.env.ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractJSON.abi, contractAddress);

exports.fundContract = function (req, res) {
  let myData = contract.methods.getContractBalance().encodeABI();

  web3.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: contractAddress,
      value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: myData,
    };

    const common = new Common({ chain: "mainnet" });
    const tx = Transaction.fromTxData(txObject, { common });

    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log("txHash:", txHash);
    });
  });
};

exports.getContractBalance = async function (req, res) {
  try {
    const response = await contract.methods.getContractBalance().call();
    console.log(response);
  } catch (e) {
    console.log("Error, reserver: ", e);
  }
};
