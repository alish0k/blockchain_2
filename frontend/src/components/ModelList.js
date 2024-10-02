// src/components/ModelList.js 
import React, { useEffect, useState } from "react"; 
import contract from "../contract"; 
import web3 from "../web3"; 

const ModelList = () => { 
  const [models, setModels] = useState([]); 

  useEffect(() => { 
    const fetchModels = async () => {
        try {
          const totalModels = await contract.methods.modelCount().call(); // This should return the count of models
          const modelArray = [];
      
          for (let i = 0; i < totalModels; i++) {
            const model = await contract.methods.models(i).call(); // Ensure this call passes the correct index
            modelArray.push(model);
          }
      
          setModels(modelArray); // Update the state with the fetched models
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };
    fetchModels(); 
  }, []); 

  const purchaseModel = async (modelId, price) => { 
    const accounts = await web3.eth.getAccounts(); 
    await contract.methods.purchaseModel(modelId).send({ 
      from: accounts[0], 
      value: price, 
    }); 
  }; 

  return ( 
    <div> 
      <h2>Available Models</h2> 
      <ul> 
        {models.map((model, index) => ( 
          <li key={index}> 
            {model.name} - {web3.utils.fromWei(model.price, "ether")} ETH 
            <button onClick={() => purchaseModel(index, model.price)}> 
              Purchase 
            </button> 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 

export default ModelList;