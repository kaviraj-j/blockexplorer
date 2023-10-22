import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getBalance(address) {
  console.log(address);
  try {
    const response = await alchemy.core.getBalance(address, "latest");
    return response;
  } catch (err) {
    console.log(err);
  }
}

function formatBalance(balance) {
  if (balance !== null) {
    const balanceInEther = parseFloat(balance) / 1e18;
    return balanceInEther.toFixed(6) + " ETH";
  }
  return "Loading...";
}

function Account() {
  const { accountAddress } = useParams();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchAccountBalance() {
      try {
        const response = await getBalance(accountAddress);
        setBalance(response);
      } catch (err) {
        alert("Error fetching balance: " + err.message);
      }
    }
    fetchAccountBalance();
  }, [accountAddress]);

  return (
    <div>
      <h2>Account Balance</h2>
      <p>Balance: {formatBalance(balance)}</p>
    </div>
  );
}

export default Account;
