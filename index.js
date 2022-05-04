const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const main = async () => {
  if (process.argv[2] === "--wallet" && process.argv[3]) {
    if (process.argv[3].length === 42) {

      console.log('success')
      
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
  console.log(res)
});
