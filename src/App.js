import { Alchemy, Network, toHex } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockNumber from "./components/BlockNumber";
import Block from "./components/Block";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [blockNumber, setBlockNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [blockData, setBlockData] = useState(null);

  // console.log(await)
  const handleBlockNumberChange = (event) => {
    setBlockNumber(event.target.value);
  };
  const handleHashChange = (event) => {
    setTransactionHash(event.target.value);
  };
  async function getBlockByNumber() {
    try {
      const response = await alchemy.core.getBlock(toHex(blockNumber));
      setBlockData(response);
    } catch (err) {
      alert("Enter Valid Number");
    }
  }
  async function getBlockByHash() {
    try {
      const response = await alchemy.core.getBlock(transactionHash);
      setBlockData(response);
    } catch (err) {
      alert("Enter valid hash");
    }
  }

  const closeBlockDetails = () => {
    setBlockData(null);
  };
  useEffect(() => {
    async function getBlockNumber() {
      setLatestBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <div className="App">
      <BlockNumber latestBlockNumber={latestBlockNumber} />
      <div>
        <label>
          Get Block by Number:
          <input
            type="text"
            // value={blockNumber}
            onChange={handleBlockNumberChange}
            placeholder="Enter a number"
          />
          <button onClick={getBlockByNumber}>Get Block</button>
        </label>
      </div>
      <div>
        <label>
          Get Block by Transaction Hash:
          <input
            type="text"
            // value={blockNumber}
            onChange={handleHashChange}
            placeholder="Enter hash"
          />
          <button onClick={getBlockByHash}>Get Block</button>
        </label>
      </div>
      <Block blockData={blockData} onClose={closeBlockDetails} />
    </div>
  );
}

export default App;
