import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addERC20Permit(c: ContractBuilder, name: string) {
  c.addParent(
    {
      name: "ERC20Permit",
      path: `${pathPrefix}/ethereum/erc20/features/ERC20Permit.sol`,
    },
    [name]
  );
}
