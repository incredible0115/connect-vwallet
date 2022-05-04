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

const getPosition = async (addr) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://api.covalenthq.com/v1/1/address/${addr}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.COVALENT_API_KEY}`,
    });

    const positions = res.data.data.items
      .filter((item) => {
        return (
          item.supports_erc === null ||
          (item.supports_erc && item.supports_erc.includes("erc20"))
        );
      })
      .map((item) => {
        return {
          symbol: item.contract_ticker_symbol,
          quote_price: item.quote_rate ? `$${item.quote_rate}` : null,
          quantity: ethers.utils.formatUnits(
            item.balance,
            item.contract_decimals
          ),
        };
      });
    return positions
  } catch (err) {
    console.log(err)
  }
};


module.exports = {
  getBalance,
  getPosition
};
