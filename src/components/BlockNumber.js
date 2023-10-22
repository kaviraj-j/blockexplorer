import React, { useEffect, useState } from "react";
import { getLatestBlockNumber } from "../alchemy/alchemy";

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
