var contractABI = [];
var contractAddress ='0x7Bc9E6f5850063E70aCCC769f44B00249C139A38';
var web3 = new Web3('http://localhost:8545');
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);
console.log(simpleSmartContract);
web3.eth.getAccounts()
.then(console.log);