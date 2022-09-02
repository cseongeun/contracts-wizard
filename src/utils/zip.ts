// import JSZip from "jszip";

// import type {
//   Contract,
//   Parent,
//   ContractFunction,
//   FunctionArgument,
// } from "./contract";
// import { printContract } from "./print";
// import { reachable } from "./transitive-closure";

// import { withHelpers } from "./options";

// export interface Contracts {
//   version: string;
//   sources: Record<string, string>;
//   dependencies: Record<string, string[]>;
// }

// export function zipContract(c: Contract): JSZip {
//   const contracts: Contracts = {
//     version: "",
//     sources: {},
//     dependencies: {},
//   };
//   const { transformImport } = withHelpers(c);
//   const contractsVariant = c.upgradeable ? "-upgradeable" : "";

//   const fileName = c.name + ".sol";

//   console.log(fileName);
//   const dependencies = {
//     [fileName]: c.parents.map((p) => transformImport(p.contract.path)),
//     ...contracts.dependencies,
//   };

//   console.log(dependencies);
//   const allImports = reachable(dependencies, fileName);

//   console.log("allImports", allImports);
//   const zip = new JSZip();
//   console.log(printContract(c, { transformImport: (p) => p }));

//   zip.file(fileName, printContract(c, { transformImport: (p) => "./" + p }));

//   // zip.file(`@seongeun/contracts${contractsVariant}/README.md`);

//   for (const importPath of allImports) {
//     console.log(allImports);
//     const source = contracts.sources[importPath];
//     if (source === undefined) {
//       throw new Error(`Source for ${importPath} not found`);
//     }
//     zip.file(importPath, source);
//   }

//   return zip;
// }
