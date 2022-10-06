import { describe, test } from "@jest/globals";
import { erc20, erc721 } from "../../../generate/api";

describe("ERC721", () => {
  test("generate", () => {
    const token = erc721;

    const opts = token.defaults;

    opts.features.enumerable = true;
    opts.features.uriStoragable = true;
    opts.features.burnable = true;
    opts.features.pausable = true;
    opts.features.mintable = true;
    opts.features.freezable = true;
    opts.features.batchTransferable = true;

    console.log(token.print());
  });
});
