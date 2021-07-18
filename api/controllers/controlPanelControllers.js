const Web3 = require("web3");
const path = require("path");
const Tx = require("@ethereumjs/tx");
const contractJSON = require("../abis/Bank.json");
const Common = require("@ethereumjs/common").default;

require("dotenv").config({ path: path.join(__dirname, "../../.env") });
// Create web3 instance connected to node provider
let web3 = new Web3(
  // In this case we will use infura
  // Refer to web3 docs for more customization
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_KEY
  )
);

// Import user and contract data
const account = process.env.ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");
// Create contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractJSON.abi, contractAddress);

exports.fundContract = function (req, res) {
  // Sign and send transactions to ethereum chain
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html

  let myData = contract.methods.anyMethod().encodeABI();
  web3.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from: account,
      to: contract,
      value: web3.utils.toHex(web3.utils.toWei("0.002", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("20", "gwei")),
    };

    const common = new Common({ chain: "mainnet" });
    const tx = Tx.Transaction.fromTxData(txObject, { common });

    const signedTx = tx.sign(privateKey);
    const serializedTx = signedTx.serialize();

    let txHash = web3.eth
      .sendSignedTransaction(web3.utils.toHex(serializedTx))
      .on("receipt", console.log)
      .catch((e) => console.log("e: ", e));
  });
};

exports.getContractBalance = async function (req, res) {
  // Pull data from contract using web3 and infura node
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html
  try {
    const response = await contract.methods.getContractBalance().call();
    console.log(response);
  } catch (e) {
    console.log("Error, reserver: ", e);
  }
};
