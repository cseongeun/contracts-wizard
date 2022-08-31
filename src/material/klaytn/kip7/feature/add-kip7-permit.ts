import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Permit(c: ContractBuilder, name: string) {
  c.addParent(
    {
      name: "KIP7Permit",
      path: `${pathPrefix}/klaytn/kip7/features/KIP7Permit.sol`,
    },
    [name]
  );
}
