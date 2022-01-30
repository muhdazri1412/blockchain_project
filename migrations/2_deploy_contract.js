const transactiondetector = artifacts.require("transactiondetector");

module.exports = function (deployer) {
  deployer.deploy(transactiondetector);
};