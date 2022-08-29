import type { ERC20Options } from "../material/ethereum/erc20/erc20";
import { accessOptions } from "../material/common/access/set-access-control";
import { infoOptions } from "../material/common/information/set-info";
import { generateAlternatives } from "./alternatives";

const booleans = [true, false];

const blueprint = {
  name: ["MyToken"],
  symbol: ["MTK"],
  premint: ["0"],

  burnable: booleans,
  freezable: booleans,
  lockable: booleans,
  pausable: booleans,
  mintable: booleans,
  permit: booleans,
  snapshot: booleans,
  vote: booleans,

  access: accessOptions,
  info: infoOptions,
};

export function* generateERC20Options(): Generator<Required<ERC20Options>> {
  yield* generateAlternatives(blueprint);
}
