import { describe, expect, test } from "@jest/globals";
import { buildGeneric, GenericOptions } from "../../material/build-generic";
import { printContract } from "../../utils/print";

describe("KIP7", () => {
  test("{kind, name, symbol}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, burnable}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      burnable: true,
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, pausable}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      pausable: true,
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, mintable}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      mintable: true,
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, mintable, accessControl-roles}", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      mintable: true,
      access: "roles",
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, lockable", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      lockable: true,
      access: "roles",
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });

  test("{kind, name, symbol, premint, freezable", async () => {
    const opt: GenericOptions = {
      kind: "KIP7",
      name: "MockKIP7",
      symbol: "MOCKKIP7",
      premint: "1000",
      freezable: true,
      access: "roles",
    };

    const kip7 = buildGeneric(opt);

    const code = printContract(kip7);
    console.log(code);
  });
});
