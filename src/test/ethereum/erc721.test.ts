import { describe, expect, test } from "@jest/globals";
import { buildGeneric, GenericOptions } from "../../material/build-generic";
import { printContract } from "../../material/print";

describe("ERC721", () => {
  test("{kind, name, symbol}", async () => {
    const opt: GenericOptions = {
      kind: "ERC721",
      name: "MockERC721",
      symbol: "MOCKERC721",
    };

    const erc721 = buildGeneric(opt);

    const code = printContract(erc721);
    console.log(code);
  });

  test("{kind, name, symbol, baseUri}", async () => {
    const opt: GenericOptions = {
      kind: "ERC721",
      name: "MockERC20",
      symbol: "MOCKERC20",
      baseUri: "https://hexlant.com/",
    };

    const erc721 = buildGeneric(opt);

    const code = printContract(erc721);
    console.log(code);
  });

  test("{kind, name, symbol, baseUri}", async () => {
    const opt: GenericOptions = {
      kind: "ERC721",
      name: "MockERC20",
      symbol: "MOCKERC20",
      baseUri: "https://hexlant.com/",
    };

    const erc721 = buildGeneric(opt);

    const code = printContract(erc721);
    console.log(code);
  });
});
