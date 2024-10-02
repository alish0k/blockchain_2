// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    // Event to emit when a model is listed
    event ModelListed(uint256 modelId, string name, uint256 price);

    struct Model {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address payable creator;
        uint8 ratingSum;
        uint8 ratingCount;
    }

    mapping(uint256 => Model) public models;
    uint256 public modelCount;

    function listModel(string memory name, string memory description, uint256 price) public {
        require(price > 0, "Price must be greater than zero");

        modelCount++;
        models[modelCount] = Model(
            modelCount,
            name,
            description,
            price,
            payable(msg.sender),
            0, 
            0
        );

        // Emit event when the model is listed
        emit ModelListed(modelCount, name, price);
    }

    // Other functions like purchaseModel, rateModel, etc.
}