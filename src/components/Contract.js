import React, { Component } from "react";
import Web3 from "web3";
import {
  getDatabase,
  child,
  get,
  ref,
  set,
  orderByChild,
  query,
} from "firebase/database";
import database from "./utils/firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./DashBoard.css";

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // env data
      db: null,
      account: "",
      contract: null,

      // input data
      contractName: "",
      contractNFTs: "",
      contractEmail: false,
      contractPhone: false,
      contractBirthday: false,
      contractAddress: "",

      // series data
      NFTsData: {},
    };

    // methods binding
  }

  async componentDidMount() {
    this.setState({ db: database });

    const web3Exist = await this.checkWeb3Exists();
    if (web3Exist) {
      await this.loadWeb3();
      await this.loadBlockchainData();
    }

    // get data from firebase when loaded
    this.getDB();
  }

  // check if web3 is installed
  async checkWeb3Exists() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      return true;
    } else {
      alert(
        "Hello! Consider adding an ethereum wallet such as MetaMask to fully use this website."
      );
      return false;
    }
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
  }

  writeDB() {
    console.log("write called!");
    console.log(database);

    set(ref(database, "Contracts/" + this.state.contractName), {
      contractName: this.state.contractName,
      contractOwnerAddress: this.state.account,
      contractNFTs: this.state.contractNFTs,
      contractEmail: this.state.contractEmail,
      contractPhone: this.state.contractPhone,
      contractBirthday: this.state.contractBirthday,
    })
      .then(() => {
        alert("write success!");
        this.getDB();
      })
      .catch((error) => {
        alert("write failed!");
      });
  }

  getDB() {
    const dbRef = ref(database);
    get(child(dbRef, "Contracts"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.setState({ NFTsData: snapshot.val() });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getSortNFTsData() {
    const NFTsData = this.state.NFTsData;
    const NFTsDataArray = [];
    for (let key in NFTsData) {
      if (NFTsData[key].contractOwnerAddress == this.state.account) {
        NFTsDataArray.push(NFTsData[key]);
      }
    }
    console.log(NFTsDataArray);
    return NFTsDataArray;
  }

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
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-name"
              label="Contract Name"
              onChange={(e) => this.setState({ contractName: e.target.value })}
            />
            <TextField
              fullWidth
              disabled
              id="outlined-address"
              label="Address of creater"
              value={this.state.account}
            />
            <TextField
              required
              id="outlined-number"
              label="Number of NFTs"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => this.setState({ contractNFTs: e.target.value })}
            />
          </div>
          <div>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.contractEmail}
                      onChange={(e) =>
                        this.setState({ contractEmail: e.target.checked })
                      }
                      name="email"
                    />
                  }
                  label="Email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.contractPhone}
                      onChange={(e) =>
                        this.setState({ contractPhone: e.target.checked })
                      }
                      name="phone"
                    />
                  }
                  label="Phone"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.contractBirthday}
                      onChange={(e) =>
                        this.setState({ contractBirthday: e.target.checked })
                      }
                      name="birthday"
                    />
                  }
                  label="Birthday"
                />
              </FormGroup>
              <FormHelperText>
                Be sure to request more data from users
              </FormHelperText>
            </FormControl>
          </div>
        </Box>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.writeDB()}
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.getDB()}
        >
          Get
        </button>
        <div>
          {this.getSortNFTsData().map((data, key) => {
            return (
              <div>
                <div>
                  <MDBCard className="token img" style={{ maxWidth: "22rem" }}>
                    <MDBCardBody>
                      <MDBCardTitle></MDBCardTitle>
                      <MDBCardText>
                        Contract Name : {data.contractName}
                      </MDBCardText>
                      <MDBCardText>
                        Number of NFTs : {data.contractNFTs}
                      </MDBCardText>
                      <MDBCardText>
                        contractOwnerAddress : {data.contractOwnerAddress}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Contract;
