import { describe, test } from "@jest/globals";
import { erc20, erc721 } from "../../../generate/api";

describe("ERC721", () => {
  it("generate", () => {
    console.log("in");
    const token = erc721;
    const opts = token.defaults;

    opts.metadata.name = "ABC";
    opts.metadata.symbol = "ABC";
    opts.access = false;
    opts.features.burnable = true;
    opts.features.pausable = false;
    opts.features.autoIncrementId = false;
    opts.features.freezable = false;
    console.log("out");

    console.log(token.print(opts));
  });
});
