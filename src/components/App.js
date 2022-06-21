import React, { Component } from "react";
import Web3 from "web3";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // set the ethereum provider
  async loadWeb3() {
    const provider = new Web3(window.web3.currentProvider);
    window.web3 = provider;
    // ask user to connect if wallet is not connecting
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // if there's a provider then lets log that it's working
    if (provider != window.web3.ethereum) {
      console.log("Wallet detected");
    } else {
      // no Eth provider, console it
      console.log("No wallet detected");
    }
  }

  async loadBlockchainData() {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    this.setState({ account: accounts });

    // create a constant js variable networkId which is set to blockchain network id
    const networkId = await window.web3.eth.net.getId();
    const networkData = KryptoBird.networks[networkId];
    if (networkData) {
      var abi = KryptoBird.abi;
      var address = networkData.address;
      var contract = new window.web3.eth.Contract(abi, address);
      console.log(contract);
    }
  }

  render() {
    return (
      <div>
        {/* navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div
            className="navbar-brand col-sm-3 col-md-3 mr-0"
            style={{ color: "black" }}
          >
            Krypto Birdz NFTs
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;
