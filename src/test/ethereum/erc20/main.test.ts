import { describe, test } from "@jest/globals";
import { erc20 } from "../../../generate/api";
import { buildERC20 } from "../../../material/ethereum/erc20/erc20";

describe("ERC20", () => {
  test("generate", () => {
    const token = erc20;
    const opts = token.defaults;

    opts.metadata.capped = "100";
    opts.features.mintable = true;
    const code = token.print(opts);
    console.log(code);
    // const code = token.print(opts);
    // const contract = buildERC20(opts);
    // const result = zipContract(contract);
    // console.log(result);
  });
});
