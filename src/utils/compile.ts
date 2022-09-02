// import fs from "fs";
// import solc from "solc";

// export const compile = (contractName: string, content: string) => {
//   var input = {
//     language: "Solidity",
//     sources: {
//       contract: {
//         content,
//       },
//     },
//     settings: {
//       outputSelection: {
//         "*": {
//           "*": ["*"],
//         },
//       },
//     },
//   };

//   function findImports(path: any) {
//     return {
//       contents: fs.readFileSync(require.resolve(path)).toString(),
//     };
//   }

//   var output = JSON.parse(
//     solc.compile(JSON.stringify(input), { import: findImports })
//   );

//   const bytecode = output.contracts.contract[contractName].evm.bytecode.object;
//   const abi = output.contracts.contract[contractName].abi;
//   return { bytecode, abi };
// };
