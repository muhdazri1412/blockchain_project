const transactiondetector = artifacts.require("CryptocurrencyLaundererDetector");

module.exports = function (deployer) {
  deployer.deploy(transactiondetector);
};