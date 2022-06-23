import React, { Component } from "react";
import Web3 from "web3";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      kryptoBirdz: [],
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
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    // create a constant js variable networkId which is set to blockchain network id
    const networkId = await window.web3.eth.net.getId();
    const networkData = KryptoBird.networks[networkId];
    if (networkData) {
      var abi = KryptoBird.abi;
      var address = networkData.address;
      var contract = new window.web3.eth.Contract(abi, address);
      this.setState({ contract });

      // call totalSupply
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });
      console.log(this.state.totalSupply);

      // keep track numbers of tokens
      for (var i = 0; i < this.state.totalSupply; i++) {
        const KryptoBird = await contract.methods.KryptoBirdz(i).call(); // KryptoBirdz type : string [] but use () to each value
        //handle state of front end
        this.setState({
          kryptoBirdz: [...this.state.kryptoBirdz, KryptoBird],
        });
      }
      console.log(this.state.kryptoBirdz);
    } else {
      window.alert("Smart Contract not deployed");
    }
  }

  // with minting we are sending info and we need to specify the account
  mint = (mintMsg) => {
    this.state.contract.methods
      .mint(mintMsg)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          kryptoBirdz: [...this.state.kryptoBirdz, mintMsg],
        });
      });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div
            className="navbar-brand col-sm-3 col-md-3 mr-0"
            style={{ color: "white" }}
          >
            NFT Authetication System
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-1">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div
                className="content mr-auto ml-auto"
                style={{ opacity: "0.8" }}
              >
                <h1 style={{ color: "white" }}>
                  NFT Authetication - Dash Board
                </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const mintMsg = this.mintMsg.value;
                    this.mint(mintMsg);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a file location"
                    className="form-control mb-1"
                    ref={(input) => (this.mintMsg = input)}
                  ></input>
                  <input
                    style={{ margin: "6px" }}
                    type="submit"
                    className="btn btn-primary btn-black"
                    value="MINT"
                  ></input>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
