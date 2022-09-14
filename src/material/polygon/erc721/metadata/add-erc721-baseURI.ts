import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC721BaseURI(c: ContractBuilder, baseUri: string) {
  c.addOverride("ERC721", functions._baseURI);
  c.setFunctionBody([`return ${JSON.stringify(baseUri)};`], functions._baseURI);
}

const functions = defineFunctions({
  _baseURI: {
    kind: "internal" as const,
    args: [],
    returns: ["string memory"],
    mutability: "pure" as const,
  },
});
