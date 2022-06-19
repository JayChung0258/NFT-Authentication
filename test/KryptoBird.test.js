const { assert } = require("chai");

const KryptoBird = artifacts.require("./KryptoBird");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("KryptoBird", (account) => {
  let contract;

  // testing container - describe

  describe("deployment", async () => {
    // testing samples with writing it
    it("deploys successfully", async () => {
      contract = await KryptoBird.deployed();
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });

    it("correct name", async () => {
      const name = await contract.name();
      assert.equal(name, "KryptoBird");
    });

    it("correct symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "JAY");
    });
  });
});
