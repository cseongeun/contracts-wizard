import { describe, expect, test } from "@jest/globals";
import { buildGeneric, GenericOptions } from "../../material/build-generic";
import { printContract } from "../../material/print";

describe("ERC20", () => {
  test("{kind, name, symbol}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, burnable}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      burnable: true,
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, pausable}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      pausable: true,
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, mintable}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      mintable: true,
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, mintable, accessControl-roles}", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      mintable: true,
      access: "roles",
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, lockable", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      lockable: true,
      access: "roles",
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });

  test("{kind, name, symbol, premint, freezable", async () => {
    const opt: GenericOptions = {
      kind: "ERC20",
      name: "MockERC20",
      symbol: "MOCKERC20",
      premint: "1000",
      freezable: true,
      access: "roles",
    };

    const erc20 = buildGeneric(opt);

    const code = printContract(erc20);
    console.log(code);
  });
});
