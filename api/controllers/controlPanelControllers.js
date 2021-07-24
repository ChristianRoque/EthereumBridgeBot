const Web3 = require("web3");
const path = require("path");
const Transaction = require("@ethereumjs/tx").Transaction;
const contractJSON = require("../abis/A.json");
const Common = require("@ethereumjs/common").default;
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

let web3ETH = new Web3(
  // In this case we will use infura to ethereum mainnet chain
  // Refer to web3 docs for more customization
  new Web3.providers.WebsocketProvider(
    "wss://rinkeby.infura.io/ws/v3/" + process.env.INFURA_KEY
  )
);

let web3BSC = new Web3(
  // In this case we will use moralis connecto to BSC chain
  // Refer to web3 docs for more customization
  new Web3.providers.WebsocketProvider(
    "wss://speedy-nodes-nyc.moralis.io/" +
      process.env.MORALIS_KEY +
      "/bsc/testnet/ws"
  )
);

// Import user and contract data
const account = process.env.BOT_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex");

// Create first contract instance - ETH CHAIN
const firstContractAddress = process.env.FIRST_CONTRACT_ADDRESS;
const firstContractChain = "Rinkeby | tesnet";
const firstContract = new web3ETH.eth.Contract(
  contractJSON.abi,
  firstContractAddress
);

// Create second contract instance - BSC CHAIN
const secondContractAddress = process.env.SECOND_CONTRACT_ADDRESS;
const secondContractChain = "BSC | testnet";
const secondContract = new web3BSC.eth.Contract(
  contractJSON.abi,
  secondContractAddress
);

exports.ethereumContract = async function (req, res) {
  // Sign and send transactions to ethereum chain
  // Read docs for more customization
  // https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html

  let myData = contract.methods.getBalance().encodeABI();

  web3ETH.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3ETH.utils.toHex(txCount),
      from: account,
      to: firstContractAddress,
      value: web3ETH.utils.toHex(web3ETH.utils.toWei("0.001", "ether")),
      gasLimit: web3ETH.utils.toHex(21000),
      gasPrice: web3ETH.utils.toHex(web3ETH.utils.toWei("20", "gwei")),
      data: myData,
    };

    const common = new Common({ chain: "rinkeby" });
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

  let myData = secondContract.methods.getBalance().encodeABI();

  web3BSC.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
      nonce: web3BSC.utils.toHex(txCount),
      from: account,
      to: secondContractAddress,
      value: web3BSC.utils.toHex(web3BSC.utils.toWei("0.001", "ether")),
      gasLimit: web3BSC.utils.toHex(21000),
      gasPrice: web3BSC.utils.toHex(web3BSC.utils.toWei("20", "gwei")),
      data: myData,
    };

    const common = Common.custom({
      name: "BSC Testnet",
      chainId: 97,
      networkId: 97,
      defaultHardfork: "'petersburg'",
    });

    const tx = Transaction.fromTxData(txObject, { common });

    const signedTx = tx.sign(privateKey);
    const serializedTx = signedTx.serialize();

    let txHash = web3BSC.eth
      .sendSignedTransaction(web3BSC.utils.toHex(serializedTx))
      .on("receipt", console.log)
      .catch((e) => console.log("e: ", e));
  });
};

exports.firstContractInfo = async function (req, res) {
  const balance = await web3ETH.eth.getBalance(firstContractAddress);

  const contractInfo = {
    name: "First Contract",
    address: firstContractAddress,
    chain: firstContractChain,
    online: true,
    balance: balance,
  };

  console.log(contractInfo);
  res.json(contractInfo);
};

exports.secondContractInfo = async function (req, res) {
  const balance = await web3BSC.eth.getBalance(secondContractAddress);

  const contractInfo = {
    name: "Second Contract",
    address: secondContractAddress,
    chain: secondContractChain,
    online: true,
    balance: balance,
  };

  console.log(contractInfo);
  res.json(contractInfo);
};

exports.botInfo = async function (req, res) {
  const firstChainBalance = await web3ETH.eth.getBalance(account);
  const secondChainBalance = await web3BSC.eth.getBalance(account);
  const botInfo = {
    name: "Test",
    address: account,
    chain: firstContractChain + " - " + secondContractChain,
    online: true,
    balance: {
      1: firstChainBalance,
      2: secondChainBalance,
    },
  };

  console.log(botInfo);
  res.json(botInfo);
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
