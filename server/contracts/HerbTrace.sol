// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract HerbTrace {
    // A structure to hold the details of each herb batch
    struct HerbBatch {
        uint256 batchId;
        string farmerName;
        string location;
        uint256 timestamp;
        string status;
    }

    // A mapping to store every batch by its ID
    mapping(uint256 => HerbBatch) public herbBatches;
    uint256 public batchCounter;

    // Event to notify when a new batch is created
    event BatchCreated(uint256 batchId, string farmerName, uint256 timestamp);

    // Function to register a new herb batch on the blockchain
    function createHerbBatch(string memory _farmerName, string memory _location) public {
        batchCounter++;
        herbBatches[batchCounter] = HerbBatch(
            batchCounter,
            _farmerName,
            _location,
            block.timestamp,
            "Harvested"
        );
        emit BatchCreated(batchCounter, _farmerName, block.timestamp);
    }

    // Function to get the history of a specific batch
    function getHerbHistory(uint256 _batchId) public view returns (HerbBatch memory) {
        return herbBatches[_batchId];
    }
}