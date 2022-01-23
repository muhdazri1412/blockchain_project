const CryptocurrencyLaundererDetector = artifacts.require("CryptocurrencyLaundererDetector");

module.exports = function (deployer) {
  deployer.deploy(CryptocurrencyLaundererDetector);
};