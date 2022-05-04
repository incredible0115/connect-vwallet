const path = require("path");
const dotenv = require("dotenv");
const { getBalance } = require("./util");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const main = async () => {
  if (process.argv[2] === "--wallet" && process.argv[3]) {
    if (process.argv[3].length === 42) {
      return {
        balance: await getBalance(process.argv[3])
      };

      
    } else {
      throw Error("Invalid wallet address");
    }
  } else {
    throw Error(
      "Please provide a wallet address"
    );
  }
};

main().then((res) => {
  console.log("Result", JSON.stringify(res, null, 2));
});
