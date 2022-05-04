const axios = require("axios")
const { ethers } = require("ethers")

const provider = new ethers.providers.EtherscanProvider(
  // "homestead",
  "ropsten",
  process.env.ETHERSCAN_API_KEY
);

const getBalance = async (addr) => {
  const balance = await provider.getBalance(addr)
  return ethers.utils.formatEther(balance)
}

module.exports = {
  getBalance
};
