import React from "react";

function Block({ blockData, onClose }) {
  if (!blockData) return null;

  return (
    <div className="block-container">
      <h2 className="block-title">Block Details</h2>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="block-data">
        <p>
          <strong>Hash:</strong> {blockData.hash}
        </p>
        <p>
          <strong>Parent Hash:</strong> {blockData.parentHash}
        </p>
        <p>
          <strong>Block Number:</strong> {blockData.number}
        </p>
        <p>
          <strong>Timestamp:</strong>{" "}
          {new Date(blockData.timestamp * 1000).toLocaleString()}
        </p>
        <p>
          <strong>Nonce:</strong> {blockData.nonce}
        </p>
        <p>
          <strong>Difficulty:</strong> {blockData.difficulty}
        </p>
        <p>
          <strong>Miner:</strong> {blockData.miner}
        </p>
        <p>
          <strong>Extra Data:</strong> {blockData.extraData}
        </p>
      </div>
    </div>
  );
}

export default Block;
