import type { ContractBuilder } from "../../../contract";

export function addERC20Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC20Burnable",
    path: "@hexlant/contracts/ethereum/erc20/features/ERC20Burnable.sol",
  });
}
