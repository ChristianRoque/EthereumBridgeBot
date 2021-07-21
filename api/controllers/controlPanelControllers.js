const Web3 = require("web3");
const path = require("path");
const Transaction = require("@ethereumjs/tx").Transaction;
const contractJSON = require("../abis/Bank.json");
const Common = require("@ethereumjs/common").default;

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

// Create web3 instance connected to node provider
let web3ETH = new Web3(
  // In this case we will use infura to ethereum mainnet chain
  // Refer to web3 docs for more customization
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/" + process.env.INFURA_KEY
  )
);

let web3BNB = new Web3(
  // In this case we will use moralis connecto to BSC chain
  // Refer to web3 docs for more customization
  new Web3.providers.WebsocketProvider(
    "wss://speedy-nodes-nyc.moralis.io/" +
      process.env.MORALIS_KEY +
      "/bsc/mainnet/ws"
  )
);

// Import user and contract data
const account = process.env.ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");
// Create contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3ETH.eth.Contract(contractJSON.abi, contractAddress);

exports.ethereumContract = async function (req, res) {
  // Sign and send transactions to ethereum chain
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html

  // let myData = contract.methods.anyMethod().encodeABI();

  web3ETH.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3ETH.utils.toHex(txCount),
      from: account,
      to: contract,
      value: web3ETH.utils.toHex(web3ETH.utils.toWei("0.001", "ether")),
      gasLimit: web3ETH.utils.toHex(21000),
      gasPrice: web3ETH.utils.toHex(web3ETH.utils.toWei("20", "gwei")),
      // data: myData,
    };

    const common = new Common({ chain: "mainnet" });
    const tx = Transaction.fromTxData(txObject, { common });

    const signedTx = tx.sign(privateKey);
    const serializedTx = signedTx.serialize();

    let txHash = web3ETH.eth
      .sendSignedTransaction(web3ETH.utils.toHex(serializedTx))
      .on("receipt", console.log)
      .catch((e) => console.log("e: ", e));
  });
};

exports.binanceContract = async function (req, res) {
  // Sign and send transactions to ethereum chain
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html

  // let myData = contract.methods.anyMethod().encodeABI();

  web3BNB.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3BNB.utils.toHex(txCount),
      from: account,
      to: contract,
      value: web3BNB.utils.toHex(web3BNB.utils.toWei("0.001", "ether")),
      gasLimit: web3BNB.utils.toHex(21000),
      gasPrice: web3BNB.utils.toHex(web3BNB.utils.toWei("20", "gwei")),
      // data: myData,
    };

    const common = Common.custom({
      name: "bnb",
      chainId: 56,
      networkId: 56,
      defaultHardfork: "'petersburg'",
    });

    const tx = Transaction.fromTxData(txObject, { common });

    const signedTx = tx.sign(privateKey);
    const serializedTx = signedTx.serialize();

    let txHash = web3BNB.eth
      .sendSignedTransaction(web3BNB.utils.toHex(serializedTx))
      .on("receipt", console.log)
      .catch((e) => console.log("e: ", e));
  });
};

exports.contractInteraction = async function (req, res) {
  // Pull data from contract using web3 and infura node
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html
  try {
    const response = await contract.methods.contractFunction().call();
    console.log(response);
  } catch (e) {
    console.log("Error, reserver: ", e);
  }
};
