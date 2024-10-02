// src/contract.js
import web3 from "./web3";
import AIModelMarketplace from "./contracts/AIModelMarketplace.json";

const contractAddress = "0xd3ca18eE835F67Ec33cE4ed9737D2E94516a124E"; // Your deployed contract address
const contract = new web3.eth.Contract(AIModelMarketplace.abi, contractAddress);

export default contract;