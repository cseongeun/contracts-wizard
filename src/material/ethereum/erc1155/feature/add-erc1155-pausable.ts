import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC1155Pausable(
  c: ContractBuilder,
  access: Access,
  pausableFns: BaseFunction[]
) {
  c.addParent({
    name: "ERC1155Pausable",
    path: `${pathPrefix}/ethereum/erc1155/features/ERC1155Pausable.sol`,
  });

  for (const fn of pausableFns) {
    c.addModifier("whenNotPaused", fn);
  }

  requireAccessControl(c, functions.pause, access, "PAUSER");
  c.addFunctionCode("_pause();", functions.pause);

  requireAccessControl(c, functions.unpause, access, "PAUSER");
  c.addFunctionCode("_unpause();", functions.unpause);
}

const functions = defineFunctions({
  pause: {
    kind: "public" as const,
    args: [],
  },

  unpause: {
    kind: "public" as const,
    args: [],
  },
});
