import { describe, test } from "@jest/globals";
import { erc20 } from "../../../generate/api";
import { buildERC20 } from "../../../material/token/erc20/erc20";

describe("ERC20", () => {
  test("generate", () => {
    const token = erc20;
    const opts = token.defaults;

    opts.features.lockable = true;
    opts.access = "ownable";
    // opts.metadata.capped =/ "100";
    const code = token.print(opts);
    console.log(code);
  });
});
