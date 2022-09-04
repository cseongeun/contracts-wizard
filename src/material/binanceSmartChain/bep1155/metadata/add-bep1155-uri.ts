import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";

export function addBEP1155URI(c: ContractBuilder, access: Access) {
  requireAccessControl(c, functions.setURI, access, "URI_SETTER");
  c.addFunctionCode("_setURI(newuri);", functions.setURI);
}

const functions = defineFunctions({
  setURI: {
    kind: "public" as const,
    args: [{ name: "newuri", type: "string memory" }],
  },
});
