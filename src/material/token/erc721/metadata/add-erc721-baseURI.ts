import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { ERC721_DEFAULT } from "../../../path/erc721-path";

export function addERC721BaseURI(c: ContractBuilder, baseUri: string) {
  c.addOverride(ERC721_DEFAULT.name, functions._baseURI);
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
