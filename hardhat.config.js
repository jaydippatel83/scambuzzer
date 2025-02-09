require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        base: {
            url: process.env.NEXT_PUBLIC_RPC_URL, 
            accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
        },
        arbitrum: {
            url: process.env.NEXT_PUBLIC_RPC_URL, 
            accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
        }
    }
};
    