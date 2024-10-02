// src/App.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ListModelForm from "./components/ListModelForm";
import RateModelForm from "./components/RateModelForm";
import AIModelMarketplace from "./contracts/AIModelMarketplace.json"; // ABI

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function loadWeb3AndContract() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        await window.ethereum.enable(); // Request account access
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]); // Set the user's account

        const networkId = await web3.eth.net.getId(); // Get current network ID
        const deployedNetwork = AIModelMarketplace.networks[networkId]; // Load the contract
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            AIModelMarketplace.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);
        } else {
          alert("Smart contract not deployed on the detected network.");
        }
      }
    }
    loadWeb3AndContract();
  }, []);

  return (
    <div>
      <h1>AI Model Marketplace</h1>
      {account ? <p>Connected as: {account}</p> : <p>Not connected</p>}
      <ListModelForm web3={web3} account={account} contract={contract} />
      <RateModelForm web3={web3} account={account} contract={contract} />
    </div>
  );
}

export default App;