import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alchemy, Network, toHex } from "alchemy-sdk";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
async function getBlockData(blockNumber) {
  try {
    const response = await alchemy.core.getBlock(toHex(blockNumber));
    return response;
  } catch (err) {
    throw new Error("Unable to fetch block data");
  }
}

function Block() {
  const { blockNumber } = useParams();
  const [blockData, setBlockData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const response = await getBlockData(blockNumber);
        setBlockData(response);
      } catch (err) {
        alert("Enter Valid Number");
      }
    }
    getData();
  }, [blockNumber]);

  console.log(blockNumber);
  if (!blockData) return <>Loading.....</>;

  return (
    <div className="block-container">
      <h2 className="block-title">Block Details</h2>

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
        <p>
          <strong>Transactions:</strong>{" "}
          <table>
            {" "}
            {blockData.transactions.map((tx, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href={`/transaction/${tx}`}>{tx}</a>
                  </td>
                </tr>
              );
            })}
          </table>
        </p>
      </div>
    </div>
  );
}

export default Block;
