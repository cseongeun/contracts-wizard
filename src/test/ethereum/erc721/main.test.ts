import { describe, test } from "@jest/globals";
import { erc20, erc721 } from "../../../generate/api";

describe("ERC721", () => {
  test("generate", () => {
    const token = erc721;

    const opts = token.defaults;

    opts.features.burnable = true;
    opts.features.mintable = true;
    opts.features.uriStorage = true;
    // opts.features.autoIncrementId = true;

    console.log(token.print());
  });
});
