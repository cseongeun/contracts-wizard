import { describe, test } from "@jest/globals";
import { erc20, erc721 } from "../../../generate/api";

describe("ERC721", () => {
  test("generate", () => {
    const token = erc721;

    const opts = token.defaults;

    opts.features.mintable = true;
    console.log(token.print());

    // opts.features.autoIncrementId = true;
    // console.log(token.print());

    opts.features.uriStorage = true;
    console.log(token.print());
  });
});
