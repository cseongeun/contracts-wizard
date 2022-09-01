import { buildERC20, ERC20Options } from "../material/ethereum/erc20/erc20";
import { buildERC721, ERC721Options } from "../material/ethereum/erc721/erc721";
import {
  buildERC1155,
  ERC1155Options,
} from "../material/ethereum/erc1155/erc1155";
import { buildKIP7, KIP7Options } from "../material/klaytn/kip7/kip7";
import { buildKIP17, KIP17Options } from "../material/klaytn/kip17/kip17";
import { buildKIP37, KIP37Options } from "../material/klaytn/kip37/kip37";

export enum Kinds {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  KIP7 = "KIP7",
  KIP17 = "KIP17",
  KIP37 = "KIP37",
}

export interface KindedOptions {
  ERC20: { kind: "ERC20" } & ERC20Options;
  ERC721: { kind: "ERC721" } & ERC721Options;
  ERC1155: { kind: "ERC1155" } & ERC1155Options;
  KIP7: { kind: "KIP7" } & KIP7Options;
  KIP17: { kind: "KIP17" } & KIP17Options;
  KIP37: { kind: "KIP37" } & KIP37Options;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export type BuildKinds = {
  ERC20: "ERC20";
  ERC721: "ERC721";
  ERC1155: "ERC1155";
  KIP7: "KIP7";
  KIP17: "KIP17";
  KIP37: "KIP37";
};

export function buildGeneric(opts: GenericOptions) {
  switch (opts.kind) {
    case "ERC20":
      return buildERC20(opts);

    case "ERC721":
      return buildERC721(opts);

    case "ERC1155":
      return buildERC1155(opts);

    case "KIP7":
      return buildKIP7(opts);

    case "KIP17":
      return buildKIP17(opts);

    case "KIP37":
      return buildKIP37(opts);

    default:
      const _: never = opts;
      throw new Error("Unknown ERC");
  }
}
