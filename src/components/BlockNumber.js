import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
async function getLatestBlockNumber() {
  try {
    const response = await alchemy.core.getBlockNumber();
    return response;
  } catch (err) {
    alert(err);
  }
}

function BlockNumber() {
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getLatestBlockNumber();
        console.log(response);
        setBlockNumber(response);
      } catch (err) {
        console.error("Error fetching latest block:", err);
        // Handle errors if necessary
      }
    }
    getData();
  }, []);

  if (!blockNumber) return <>Loading...</>;

  return (
    <div>
      Latest Block Number: <a href={`/block/${blockNumber}`}>{blockNumber}</a>
    </div>
  );
}

export default BlockNumber;
