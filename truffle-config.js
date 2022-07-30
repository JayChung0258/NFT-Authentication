const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "own medal tail wrestle drill hello fire cupboard load step client chicken";

module.exports = {
  // path of the contracts
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/a50e70eddf344993b4371d7ba3fe96d0"
        );
      },
      network_id: "*",
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

// ----------------------------------------------------------------------------- local ganache

// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1", // Localhost (default: none)
//       port: 7545, // Standard Ethereum port (default: none)
//       network_id: "*", // Any network (default: none)
//     },
//   },

//   contracts_directory: "./src/contracts/",
//   contracts_build_directory: "./src/abis",

//   // Configure your compilers
//   compilers: {
//     solc: {
//       version: "^0.8.0",
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };
