import React, { useState, useEffect } from "react";
import { getBalance } from "../alchemy/alchemy";
import { useParams } from "react-router-dom";

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
