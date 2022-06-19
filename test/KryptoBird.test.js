const assert = require("chai");
const { Item } = require("react-bootstrap/lib/Breadcrumb");

const KryptoBird = artifacts.require("./KryptoBird");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("KryptoBird", (account) => {
  let contract;

  // testing container - describe

  decribe("deployment", async () => {
    // testing samples with writing it
    it("deploys successfully", async () => {
      contract = await KryptoBird.deployed();
      const address = contrat.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
  });
});
