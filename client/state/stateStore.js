import { configure } from "mobx";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

configure({
  enforceActions: "never",
});

export function createStateStore() {
  return {
    contracts: {
      userAddress: "0x0000000000000000000000000000000000000000",
      bot: {
        name: "Test",
        address: "0x0000000000000000000000000000000000000000",
        chain: "ETH | mainnet - BSC | mainnet",
        online: true,
        balance: 0,
      },
      firstContract: {
        name: "First Contract",
        address: "0x0000000000000000000000000000000000000000",
        chain: "ETH | mainnet",
        online: true,
        balance: 0,
      },
      secondContract: {
        name: "Second Contract",
        address: "0x0000000000000000000000000000000000000000",
        chain: "BSC | mainnet",
        online: true,
        balance: 0,
      },

      async loadChain() {
        // Detect provider
        const provider = await detectEthereumProvider();
        const web3 = new Web3(window.ethereum);

        // If provider exists load blockchain
        if (provider) {
          this.chainId = await provider.request({ method: "eth_chainId" });
          provider.on("chainChanged", this.handleChainChanged);

          // Pull account address
          const response = await provider
            .request({ method: "eth_accounts" })
            .catch((err) => {
              console.error(err);
            });

          if (response.length != 0) {
            this.userAddress = response.toString();
          }

          // Handle account change from metamask
          await provider.on("accountsChanged", this.handleAccountsChanged);
        } else {
          console.log("Please install MetaMask!");
        }
      },

      async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== this.address) {
          // Address must be converted to String
          this.address = accounts[0].toString();
        }
      },

      handleChainChanged() {
        console.log("Chain changed to", this.chainId);
      },
      // ************************************ API ******************************************
      root: "https://ethereum-bridge-bot.vercel.app/",
      fetchContractData() {
        fetch(this.root + "api/contract-data")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.firstContract = data[0];
            this.secondContract = data[1];
            this.bot = data[2];
          });
        this.firstContract;
      },
    },
  };
}
