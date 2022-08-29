import type { ContractBuilder } from "../../../contract";

export function addERC20Permit(c: ContractBuilder, name: string) {
  c.addParent(
    {
      name: "ERC20Permit",
      path: "@hexlant/contracts/ethereum/erc20/features/ERC20Permit.sol",
    },
    [name]
  );
}
