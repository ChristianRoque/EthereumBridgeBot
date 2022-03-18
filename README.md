
## Ethereum Bridge Bot
### About 

A small template of an API/Bot running a bridge between two Ethereum chains. The bot was built using Javascript, Express.js, Web3, Infura and Moralis as node providers of choice to connect to the desired chain. Moreover, this template also comes with a truffle setup and dummy contract ready to be deployed once the wallet is connected. This bot is connected to a React.js and Next.js frontend with pertaining information of contract address, value, and status. Extra fields can be added and modified with more customization on contract and bot information. All data is saved to a global state setup using Mobx. Metamask wallet support comes built-in but more can be added if desired.

### Technologies

#### API / Bot  

```
@ethereumjs/common
@ethereumjs/tx
@truffle/hdwallet-provider
body-parser
cors
dotenv
ethereumjs-util
express
morgan
path
web3
nodemon
```

#### Frontend 

```
@material-ui/core
@material-ui/icons
@metamask/detect-provider
@metamask/onboarding
@netlify/plugin-nextjs
axios
mobx
mobx-react
next
react
react-dom
styled-components
web3
```

### Installation and setup

#### Cloning repo
```
git clone https://github.com/ChristianRoque/EthereumBridgeBot.git
```

#### Backend Setup
```
npm install 
touch .env
```

Create enviromental variables inside .env file.

```
INFURA_KEY= <infura_node_key>
MORALIS_KEY= <moralis_node_key>
BOT_ADDRESS= <bot_wallet_address>
PRIVATE_KEY= <bot_private_key>
FIRST_CONTRACT_ADDRESS= <contract_address>
SECOND_CONTRACT_ADDRESS= <contract_address>
```
> Note: These variables must also be added during the deployment process with the hosting provider. For this demo, Heroku was used to upload and host the API.

Start app running: 
```
npm start
```

#### Frontend Setup 

```
cd client
npm install
```

Inside client nagivate to global state to change root address of API.

```
client
   |
  state 
    |
  stateStore.js
```

Change `root`.

```
root: "http://localhost:3000/"
```

 
