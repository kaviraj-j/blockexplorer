import { Alchemy, Network, toHex } from "alchemy-sdk";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getBlockData(blockNumber) {
  try {
    const response = await alchemy.core.getBlock(toHex(blockNumber));
    return response;
  } catch (err) {
    throw new Error("Unable to fetch block data");
  }
}

export async function getLatestBlockNumber() {
  try {
    const response = await alchemy.core.getBlockNumber();
    return response;
  } catch (err) {
    alert(err);
  }
}

export async function getTransactionData(transactionHash) {
  try {
    const response = await alchemy.transact.getTransaction(transactionHash);
    return response;
  } catch (err) {
    alert("Enter Valid Hash");
  }
}
export async function getBalance(address) {
  console.log(address);
  try {
    const response = await alchemy.core.getBalance(address, "latest");
    return response;
  } catch (err) {
    console.log(err);
  }
}
