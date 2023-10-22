import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getTransactionData(transactionHash) {
  try {
    const response = await alchemy.transact.getTransaction(transactionHash);
    return response;
  } catch (err) {
    alert("Enter Valid Hash");
  }
}

function Transaction() {
  const { transactionHash } = useParams();
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getTransactionData(transactionHash);
        setTransactionData(response);
      } catch (err) {
        alert("Enter Valid Hash");
      }
    }
    getData();
  }, [transactionHash]);

  if (transactionData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="transaction-container">
      <h2>Transaction Details</h2>
      <ul className="transaction-details">
        <li className="transaction-detail-item">
          <span className="transaction-label">Hash:</span>
          <span className="transaction-value">{transactionData.hash}</span>
        </li>
        <li className="transaction-detail-item">
          <span className="transaction-label">Block Number:</span>
          <span className="transaction-value">
            <a href={`/block/${transactionData.blockNumber}`}>
              {transactionData.blockNumber}
            </a>
          </span>
        </li>
        <li className="transaction-detail-item">
          <span className="transaction-label">From:</span>
          <span className="transaction-value">
            <a href={`/account/${transactionData.from}`}>
              {transactionData.from}
            </a>
          </span>
        </li>
        <li className="transaction-detail-item">
          <span className="transaction-label">To:</span>
          <span className="transaction-value">
            <a href={`/account/${transactionData.to}`}>{transactionData.to}</a>
          </span>
        </li>
        <li className="transaction-detail-item">
          <span className="transaction-label">Value:</span>
          <span className="transaction-value">
            {transactionData.value.hex} wei
          </span>
        </li>
        {/* Add more fields as needed */}
      </ul>
    </div>
  );
}

export default Transaction;
