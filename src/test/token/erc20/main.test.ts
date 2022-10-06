import { describe, test } from "@jest/globals";
import { erc1155, erc20 } from "../../../generate/api";
import { buildERC20 } from "../../../material/token/erc20/erc20";

describe("ERC20", () => {
  test("generate", () => {
    const token = erc1155;
    const opts = token.defaults;

    opts.access = "ownable";
    opts.features.burnable = true;
    opts.features.freezable = true;
    opts.features.mintable = true;
    opts.features.pausable = true;
    opts.features.supplyTackable = true;
    opts.features.uriStoragable = true;
    const code = token.print(opts);
    console.log(code);
  });
});
