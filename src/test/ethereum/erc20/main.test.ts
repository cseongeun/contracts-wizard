import { describe, test } from "@jest/globals";
import { erc20 } from "../../../generate/api";
import { buildERC20 } from "../../../material/ethereum/erc20/erc20";

describe("ERC20", () => {
  test("generate", () => {
    const token = erc20;
    const opts = token.defaults;
    opts.metadata.premint = "100";
    opts.features.burnable = true;
    opts.features.pausable = true;
    const code = token.print(opts);
    // const code = token.print(opts);
    // const contract = buildERC20(opts);
    // const result = zipContract(contract);
    // console.log(result);
  });
  it("asdf", async () => {});
});
