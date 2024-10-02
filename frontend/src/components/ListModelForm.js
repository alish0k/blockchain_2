import React, { useState } from "react";

const ListModelForm = ({ contract, account, web3 }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [modelId, setModelId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contract && account) {
      try {
        const priceInWei = web3.utils.toWei(price, "ether");
        
        // Correct syntax: await should be followed by a valid function call.
        const response = await contract.methods
          .listModel(name, description, priceInWei)
          .send({ from: account });
        
        // Capture the model ID from the event logs
        const newModelId = response.events.ModelListed.returnValues.modelId;
        setModelId(newModelId);
        alert(`AI Model listed with ID: ${newModelId}`);
      } catch (err) {
        console.error("Error adding model: ", err);
        alert("Failed to add the AI Model.");
      }
    }
  };

  return (
    <div>
      <h2>List New AI Model</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Model Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price in Ether"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">List Model</button>
      </form>

      {modelId && (
        <p>
          Model successfully listed with ID: <strong>{modelId}</strong>
        </p>
      )}
    </div>
  );
};

export default ListModelForm;