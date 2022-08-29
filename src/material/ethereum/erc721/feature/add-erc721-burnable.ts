import type { ContractBuilder } from "../../../contract";

export function addERC721Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC721Burnable",
    path: "@hexlant/contracts/ethereum/erc721/features/ERC721Burnable.sol",
  });
}
