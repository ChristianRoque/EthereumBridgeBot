import { configure } from "mobx";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

configure({
  enforceActions: "never",
});

export function createStateStore() {
  return {
    // ***************************** Blockchain State ****************************************
    userAddress: "0x0000000000000000000000000000000000000000",
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

        // Save current account address logged on metamask
        this.userAddress = response.toString();

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
  };
}
