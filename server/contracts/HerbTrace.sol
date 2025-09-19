// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HerbTrace {
    // A struct for each event in the supply chain history
    struct TraceEvent {
        string status;
        string location;
        string stakeholder;
        string notes;
        string eventTimestamp;
        uint256 blockTimestamp;
    }

    struct HerbBatch {
        string batchId;         // ✅ CHANGED to string
        string farmerName;
        string location;
        string herbType;
        uint256 quantityKg;
        string gpsCoordinates;
        string harvestDate;
        string farmingMethod;
        string qualityScore;
        uint256 creationTimestamp;
        TraceEvent[] history; // Array to store the full traceability history
    }

    // ✅ MAPPING now uses a string as the key
    mapping(string => HerbBatch) public herbBatches;

    event BatchCreated(string batchId, string farmerName, uint256 timestamp);
    event BatchUpdated(string batchId, string newStatus, uint256 timestamp);

    function createHerbBatch(
        string memory _batchId, // ✅ ADDED string batchId from backend
        string memory _farmerName,
        string memory _location,
        string memory _herbType,
        uint256 _quantityKg,
        string memory _gpsCoordinates,
        string memory _harvestDate,
        string memory _farmingMethod,
        string memory _qualityScore
    ) public {
        require(bytes(herbBatches[_batchId].batchId).length == 0, "Batch ID already exists.");
        
        HerbBatch storage newBatch = herbBatches[_batchId];
        newBatch.batchId = _batchId;
        newBatch.farmerName = _farmerName;
        newBatch.location = _location;
        newBatch.herbType = _herbType;
        newBatch.quantityKg = _quantityKg;
        newBatch.gpsCoordinates = _gpsCoordinates;
        newBatch.harvestDate = _harvestDate;
        newBatch.farmingMethod = _farmingMethod;
        newBatch.qualityScore = _qualityScore;
        newBatch.creationTimestamp = block.timestamp;
        
        // Add the first "Harvested" event to its history
        newBatch.history.push(TraceEvent("Harvested", _location, "Farmer", "Initial registration", _harvestDate, block.timestamp));

        emit BatchCreated(_batchId, _farmerName, block.timestamp);
    }

    function addTraceEvent(
        string memory _batchId, 
        string memory _newStatus, 
        string memory _newLocation,
        string memory _stakeholder,
        string memory _notes,
        string memory _eventTimestamp
    ) public {
        require(bytes(herbBatches[_batchId].batchId).length != 0, "Batch does not exist.");
        herbBatches[_batchId].history.push(TraceEvent(
            _newStatus, 
            _newLocation,
            _stakeholder,
            _notes,
            _eventTimestamp,
            block.timestamp
        ));
        emit BatchUpdated(_batchId, _newStatus, block.timestamp);
    }

    function getHerbHistory(string memory _batchId) public view returns (HerbBatch memory) {
        return herbBatches[_batchId];
    }
}