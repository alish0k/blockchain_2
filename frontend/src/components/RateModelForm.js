import React, { useState } from "react";

const RateModelForm = ({ contract, account }) => {
  const [modelId, setModelId] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contract && account) {
      try {
        // Ensure rating is between 1 and 5
        if (rating < 1 || rating > 5) {
          alert("Rating must be between 1 and 5.");
          return;
        }

        // Correct syntax: await should be followed by a valid function call.
        await contract.methods.rateModel(modelId, rating).send({ from: account });
        
        alert(`Model with ID: ${modelId} successfully rated.`);
      } catch (err) {
        console.error("Error rating model: ", err);
        alert("Failed to rate the AI Model. Ensure you have purchased the model.");
      }
    }
  };

  return (
    <div>
      <h2>Rate AI Model</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Model ID"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button type="submit">Rate Model</button>
      </form>
    </div>
  );
};

export default RateModelForm;