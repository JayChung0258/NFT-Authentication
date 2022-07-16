import React, { Component } from "react";
import Web3 from "web3";
import NFTAuthentication from "../abis/NFTAuthentication.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      targetWalletTotalSupply: 0,
      NFTAuthenticationTokens: [], // this include all info of all tokens
      targetWalletAuthTokens: [], // this one should store the tokenId, onwer's info, and imageType
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
    const networkData = NFTAuthentication.networks[networkId];
    if (networkData) {
      var abi = NFTAuthentication.abi;
      var address = networkData.address;
      var contract = new window.web3.eth.Contract(abi, address);
      this.setState({ contract });

      // call totalSupply
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });
      console.log("contract total supply: " + this.state.totalSupply);

      // individual supply
      const targetWalletTotalSupply = await contract.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ targetWalletTotalSupply });
      console.log(
        "target wallet total supply: " + this.state.targetWalletTotalSupply
      );

      // keep track numbers of tokens
      // for (var i = 0; i < this.state.totalSupply; i++) {
      //   const KryptoBird = await contract.methods.KryptoBirdz(i).call(); // KryptoBirdz type : string [] but use () to each value
      //   //handle state of front end
      //   this.setState({
      //     kryptoBirdz: [...this.state.kryptoBirdz, KryptoBird],
      //   });
      // }
      console.log(this.state.NFTAuthenticationTokens);

      // keep track numbers of tokens in target wallet
      for (var i = 0; i < this.state.totalSupply; i++) {
        const typeImage = await contract.methods.TypeOfNFTTokens(i).call(); // image of types
        const userInfo = await contract.methods.NFTAuthentications(i).call(); // token info (user's info)
        const tokenId = await contract.methods.tokenByIndex(i).call(); // token id
        const ownerAddress = await contract.methods.ownerOf(i).call(); // owner address
        const timeStamp = await contract.methods.MintTimeStamp(i).call(); // time stamp
        const mintDate = new Date(timeStamp * 1000);

        // store all info in one object
        const authToken = {
          typeImage,
          userInfo,
          tokenId,
          ownerAddress,
          mintDate,
        };

        //handle state of front end
        console.log("ownerAddress: " + ownerAddress);
        console.log("accounts[0]: " + this.state.account);
        console.log("timestamp: " + timeStamp);
        console.log("mintDate: " + mintDate);

        // if token is in the target wallet then add it to the state
        if (ownerAddress.toUpperCase() == accounts[0].toUpperCase()) {
          console.log("SAME!");
          this.setState({
            targetWalletAuthTokens: [
              ...this.state.targetWalletAuthTokens,
              authToken,
            ],
          });
        }
      }
      console.log(this.state.targetWalletAuthTokens);
    } else {
      window.alert("Smart Contract not deployed");
    }
  }

  // With minting we are sending info and we need to specify the account
  // Use the user info as the sender msg
  mint = (mintMsg, typeMsg) => {
    this.state.contract.methods
      .mint(mintMsg, typeMsg)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          NFTAuthenticationTokens: [
            ...this.state.NFTAuthenticationTokens,
            mintMsg,
          ],
        });
      });
  };

  render() {
    return (
      <div className="container-filled">
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
                <h1 style={{ color: "black" }}>
                  NFT Authetication - Dash Board
                </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    // const typeOfNFT = this.typeOfNFT.value;
                    const mintMsg = this.mintMsg.value;
                    const typeMsg = this.typeMsg.value;
                    this.mint(mintMsg, typeMsg);
                  }}
                >
                  {/* Get user' info */}
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control mb-1"
                    ref={(input) => (this.mintMsg = input)}
                  ></input>
                  {/* Choose type of NFT */}
                  <input
                    type="text"
                    placeholder="Image location"
                    className="form-control mb-1"
                    ref={(input) => (this.typeMsg = input)}
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
          <hr></hr>
          <div className="row textCenter">
            {this.state.targetWalletAuthTokens.map((authToken, key) => {
              return (
                <div>
                  <div>
                    <MDBCard
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    >
                      <MDBCardImage
                        src={authToken.typeImage}
                        position="top"
                        height="250rem"
                        style={{ marginRight: "4px" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle></MDBCardTitle>
                        <MDBCardText>
                          User Info : {authToken.userInfo}
                        </MDBCardText>
                        <MDBCardText>
                          Unique token ID : {authToken.tokenId.toNumber()}
                        </MDBCardText>
                        <MDBCardText>
                          Mint Date : {authToken.mintDate.toString()}
                        </MDBCardText>
                        {/* Btn limk to info */}
                        {/* <MDBBtn>Token Info</MDBBtn> */}
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
