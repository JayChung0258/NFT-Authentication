import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
  }
  // detect the ethereum provider (eg. MetaMask)
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    // modern browesers
    // if there's a provider then lets log that it's working
    if (provider) {
      console.log("Eth wallet is connected");
      window.web3 = new Web3(provider);
    } else {
      // no Eth provider, console it
      console.log("no Eth wallet detected");
    }
  }
  render() {
    return (
      <div>
        <h1>NFT Market Place</h1>
      </div>
    );
  }
}

export default App;
