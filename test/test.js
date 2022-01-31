// const fs = require('fs');
// const contract = JSON.parse(fs.readFileSync('./build/contracts/transactiondetector.json', 'utf8'));
// console.log(JSON.stringify(contract.abi));

// var contractAddress = 0x96D6DE9D88f5747e19c9AFd91288BdA674528238;

// var abi = contract.abi;
// var ClientReceipt = new web3.eth.Contract(abi);
// var clientReceiptContract = ClientReceipt.at(contractAddress);

// var event = clientReceiptContract.Deposit(function(error, result) {
//    if (!error)console.log(result);
// });

const transactiondetector = artifacts.require("transactiondetector");

contract("Check for transaction", function(accounts){




   it("DEPOSIT 5 ether from account 1", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[1], value: 5 * 10**18});
   });

   it("DEPOSIT 5 ether from account 2", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[2], value: 5 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const NGO = await transactiondetector.deployed();

      let hugeTransactors, amountHuge = await NGO.getHugeTransactors();
      
         console.log(hugeTransactors);
         console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const NGO = await transactiondetector.deployed();

      let potential_launderers = await NGO.getpotentialLaunderers();

      console.log(potential_launderers);
   });
   
   it("Smart Contract Balance", async() =>{
      const NGO = await transactiondetector.deployed();
      
      let scBalance = await NGO.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});

contract("Check for money laundering (deposit exceeding threshold)", function(accounts){

   it("DEPOSIT 15 ether from account 3", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[3], value: 15 * 10**18});
   });

   it("DEPOSIT 15 ether from account 4", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[4], value: 15 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const NGO = await transactiondetector.deployed();

      let hugeTransactors, amountHuge = await NGO.getHugeTransactors();
         
      console.log(hugeTransactors);
      console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const NGO = await transactiondetector.deployed();

      let potential_launderers = await NGO.getpotentialLaunderers();

      console.log(potential_launderers);
   });

   it("Smart Contract Balance", async() =>{
      const NGO = await transactiondetector.deployed();
      
      let scBalance = await NGO.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});

contract("POSSIBLE MONEY LAUNDERING (SMART CONTRACT BALANCE EXCEED THRESHOLD)", function(accounts){
   it("DEPOSIT 9 ether from account 1", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[1], value: 9 * 10**18});
   });

   it("WITHDRAW 8 ether to account 2", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.withdraw(8, {from: accounts[2]});
   });

   it("DEPOSIT 6 ether from account 2", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[2], value: 6 * 10**18});
   });

   it("DEPOSIT 25 ether from account 1", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[1], value: 25 * 10**18});
   });

   it("WITHDRAW 2 ether to account 2", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.withdraw(2, {from: accounts[2]});
   });

   it("DEPOSIT 30 ether from account 3", async () => {
      const NGO = await transactiondetector.deployed();
      NGO.deposit({from: accounts[3], value: 30 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const NGO = await transactiondetector.deployed();

      let hugeTransactors, amountHuge = await NGO.getHugeTransactors();
         
      console.log(hugeTransactors);
      console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const NGO = await transactiondetector.deployed();

      let potential_launderers = await NGO.getpotentialLaunderers();

      console.log(potential_launderers);
   });

   it("Smart Contract Balance", async() =>{
      const NGO = await transactiondetector.deployed();
      
      let scBalance = await NGO.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});