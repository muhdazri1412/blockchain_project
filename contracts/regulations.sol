// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

contract Regulation {
    
    /**
     * Variables
     */
    
    struct donor_account {
        int id;
        address addr;
        uint balance;
    }
    
    struct involve {
        address addr;
        uint amount;
    }
    
    donor_account[] donors;
    involve[] involved;
    address[] alldonors;
    int donorCounter;
    bool susTX;
    uint maxBalance;
    uint threshold;
    address payable organization;
    
    constructor() {
        donorCounter = 0;
        maxBalance = 50 ether;
        susTX = false;
    }
    
    /**
     * Events
     */
     event warning(string);
     event allSuspects(address, uint);
     event suspecteddonors(address);
    
    /**
     * Modifier
     */
    
    modifier onlyorganization() {
        require(msg.sender == organization, "Only organization can call!");
        _;
    }
    
    modifier onlydonors() {
        bool isdonor = false;
        for(uint i = 0; i < donors.length; ++i) {
            if(donors[i].addr == msg.sender) {
                isdonor = true;
                break;
            }
        }
        require(isdonor, "Only donors can call!");
        _;
    }
    
    /**
     * Utilities
     */
    
    /**
     * Contract Functions (only can be access organization)
     */
    
    function setorganization(address _organizationAddress) public returns (string memory) {
        organization = payable(_organizationAddress);
        return "";
    }
    
    function setThreshold (uint _amount) public onlyorganization returns(string memory){
        threshold = _amount * 1 ether;
        return "";
    }
    
    function getAlert () onlyorganization public {
        if(susTX == true) {
            emit warning("Alert: Huge amount transaction !");
            for(uint i = 0; i < involved.length; ++i) {
                emit allSuspects(involved[i].addr, involved[i].amount);
            }
        } else {
            emit warning("Message: No suspicious transaction !");
        }
        if(address(this).balance > maxBalance) {
            emit warning("Alert: Suspected crypto laundering !");
            for(uint i = 0; i < involved.length; ++i) {
                emit suspecteddonors(alldonors[i]);
            }
        } else {
            emit warning("Message: No suspicious laundering !");
        }
    }
    
    /**
     * Contract Functions
     */
    
    function joinAsdonor() public payable returns (string memory) {
        donors.push(donor_account(donorCounter++, msg.sender, address(msg.sender).balance));
        return "";
    }
    
    function deposit() public payable onlydonors {
        payable(address(this)).transfer(msg.value);
        alldonors.push(msg.sender);
        if(msg.value > threshold) {
            involved.push(involve(msg.sender, msg.value));
            susTX = true;
        }
    }
    
    function withdraw(uint _amount) public payable onlydonors {
        msg.sender.transfer(_amount * 1 ether);
        alldonors.push(msg.sender);
        if(_amount > threshold) {
            involved.push(involve(msg.sender, _amount));
            susTX = true;
        }
    }
    
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    /**
     * Fallback function for the contract to receive ether
     */
    
    receive () external payable {}
}