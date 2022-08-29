import type { ContractBuilder } from "../../../contract";

export function addERC1155Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC1155Burnable",
    path: "@hexlant/contracts/ethereum/erc1155/features/ERC1155Burnable.sol",
  });
}
