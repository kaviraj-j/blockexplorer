import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockNumber from "./BlockNumber";

function Home() {
  const [blockNumber, setBlockNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [address, setAddress] = useState("");

  const handleBlockNumberChange = (event) => {
    setBlockNumber(event.target.value);
  };

  const handleTransactionHashChange = (event) => {
    setTransactionHash(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const clearBlockNumber = () => {
    setBlockNumber("");
  };

  const clearTransactionHash = () => {
    setTransactionHash("");
  };

  return (
    <div>
      <BlockNumber />
      <div>
        <label>
          Get Block by Number:
          <input
            type="text"
            value={blockNumber}
            onChange={handleBlockNumberChange}
            placeholder="Enter a number"
          />
          <Link to={`/block/${blockNumber}`} onClick={clearBlockNumber}>
            Get Block
          </Link>
        </label>
      </div>
      <div>
        <label>
          Get Transaction data:
          <input
            type="text"
            value={transactionHash}
            onChange={handleTransactionHashChange}
            placeholder="Enter transaction hash:"
          />
          <Link
            to={`/transaction/${transactionHash}`}
            onClick={clearTransactionHash}
          >
            Get Transaction
          </Link>
        </label>
      </div>
      <div>
        <label>
          Get Balance:
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter an Ethereum address"
          />
          <Link to={`/account/${address}`}>Get Balance</Link>
        </label>
      </div>
    </div>
  );
}

export default Home;
