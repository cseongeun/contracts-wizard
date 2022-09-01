import { describe, test } from "@jest/globals";
import { erc20 } from "../../../generate/api";

describe("ERC20", () => {
  test("generate", () => {
    const token = erc20;

    const opts = token.defaults;

    console.log(token.print());
  });
});
