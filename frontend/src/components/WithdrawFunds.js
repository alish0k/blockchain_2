// src/components/WithdrawFunds.js
import React from "react";
import contract from "../contract";
import web3 from "../web3";

const WithdrawFunds = () => {
  const withdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdrawFunds().send({ from: accounts[0] });
  };

  return <button onClick={withdraw}>Withdraw Funds</button>;
};

export default WithdrawFunds;