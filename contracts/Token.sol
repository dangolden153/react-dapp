//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract Token {
  string public name = "Nader Dabit Token";
  string public symbol = "NDT" ;
  uint public totalSupply= 100000 ;

 //passing the uint varaible to a particular address and making the balances its overall varaible by destructring the object like function
  mapping(address => uint) balances ;



  constructor() {
    balances[msg.sender] = totalSupply ;
  }

  function transfer(address to, uint amount) external{
      require(balances[msg.sender] >= amount, "not enough tokens") ;
      balances[msg.sender] -= amount ;
      balances[to] += amount ;
  }


  function balanceOf(address account) external view returns (uint){
      return balances[account] ;
  }

}