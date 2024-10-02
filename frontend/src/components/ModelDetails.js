// src/components/ModelDetails.js
import React, { useState } from "react";
import contract from "../contract";

const ModelDetails = () => {
  const [modelId, setModelId] = useState("");
  const [details, setDetails] = useState(null);

  const getModelDetails = async () => {
    const model = await contract.methods.getModelDetails(modelId).call();
    setDetails(model);
  };

  return (
    <div>
      <input
        type="text"
        value={modelId}
        onChange={(e) => setModelId(e.target.value)}
        placeholder="Model ID"
      />
      <button onClick={getModelDetails}>View Model Details</button>
      {details && (
        <div>
          <h3>Model Name: {details[0]}</h3>
          <p>Description: {details[1]}</p>
          <p>Price: {details[2]}</p>
          <p>Average Rating: {details[4]}</p>
        </div>
      )}
    </div>
  );
};

export default ModelDetails;