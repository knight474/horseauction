const Auction = artifacts.require("HorseAuction");

module.exports = function(deployer) {
  deployer.deploy(Auction);
};