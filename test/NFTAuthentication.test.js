const { assert } = require("chai");

const NFTAuthentication = artifacts.require("./NFTAuthentication");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("NFTAuthentication", (accounts) => {
  // init the global variable
  let contract;

  // before key word make the tests to run this first
  before(async () => {
    contract = await NFTAuthentication.deployed();
  });

  // testing container - describe
  describe("deployment", async () => {
    // testing samples with writing it
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });

    it("correct name", async () => {
      const name = await contract.name();
      assert.equal(name, "NFTAuthentication");
    });

    it("correct symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "JAY");
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await contract.mint("http....1", "TEST.jpg");
      const totalSupply = await contract.totalSupply();

      // Sucess
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args; // use emit event info to check
      assert.equal(
        event._from,
        "0x0000000000000000000000000000000000000000",
        "from is the contract"
      );
      assert.equal(event._to, accounts[0], "to is msg sender");

      // Failure (try duplicated minting)
      await contract.mint("http....1", "TEST.jpg").should.be.rejected;
    });
  });

  describe("minting", async () => {
    it("lists Auth tokens", async () => {
      // Mint new tokens
      await contract.mint("http....2", "TEST.jpg");
      await contract.mint("http....3", "TEST.jpg");
      await contract.mint("http....4", "TEST.jpg");
      const totalSupply = await contract.totalSupply();

      // Loop through list and grab Kbirdz from list
      let result = [];
      let auth;
      for (i = 0; i < totalSupply; i++) {
        auth = await contract.NFTAuthentications(i); // NFTAuthentications type : string [] but use () to each value
        result.push(auth);
      }
      let expected = ["http....1", "http....2", "http....3", "http....4"];
      assert.equal(result.join(","), expected.join(","));
    });
  });
});
