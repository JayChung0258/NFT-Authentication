const NFTAuthentication = artifacts.require("NFTAuthentication");

module.exports = function(deployer) {
  deployer.deploy(NFTAuthentication);
};
