import type { CommonOptions } from "../utils/common-options";
import {
  printERC20,
  defaults as erc20defaults,
  isAccessControlRequired as erc20IsAccessControlRequired,
  ERC20Options,
} from "../material/token/erc20/erc20";
import {
  printERC721,
  defaults as erc721defaults,
  isAccessControlRequired as erc721IsAccessControlRequired,
  ERC721Options,
} from "../material/ethereum/erc721/erc721";
import {
  printERC1155,
  defaults as erc1155defaults,
  isAccessControlRequired as erc1155IsAccessControlRequired,
  ERC1155Options,
} from "../material/ethereum/erc1155/erc1155";
import {
  printKIP7,
  defaults as kip7defaults,
  isAccessControlRequired as kip7IsAccessControlRequired,
  KIP7Options,
} from "../material/klaytn/kip7/kip7";
import {
  printKIP17,
  defaults as kip17defaults,
  isAccessControlRequired as kip17IsAccessControlRequired,
  KIP17Options,
} from "../material/klaytn/kip17/kip17";
import {
  printKIP37,
  defaults as kip37defaults,
  isAccessControlRequired as kip37IsAccessControlRequired,
  KIP37Options,
} from "../material/klaytn/kip37/kip37";
import {
  printBEP20,
  defaults as bep20defaults,
  isAccessControlRequired as bep20IsAccessControlRequired,
  BEP20Options,
} from "../material/binanceSmartChain/bep20/bep20";
import {
  printBEP721,
  defaults as bep721defaults,
  isAccessControlRequired as bep721IsAccessControlRequired,
  BEP721Options,
} from "../material/binanceSmartChain/bep721/bep721";
import {
  printBEP1155,
  defaults as bep1155defaults,
  isAccessControlRequired as bep1155IsAccessControlRequired,
  BEP1155Options,
} from "../material/binanceSmartChain/bep1155/bep1155";
import {
  printERC20 as polygonPrintERC20,
  defaults as polygonErc20defaults,
  isAccessControlRequired as polygonErc20IsAccessControlRequired,
  ERC20Options as PolygonERC20Options,
} from "../material/polygon/erc20/erc20";
import {
  printERC721 as polygonPrintERC721,
  defaults as polygonErc721defaults,
  isAccessControlRequired as polygonErc721IsAccessControlRequired,
  ERC721Options as PolygonERC721Options,
} from "../material/polygon/erc721/erc721";
import {
  printERC1155 as polygonPrintERC1155,
  defaults as polygonErc1155defaults,
  isAccessControlRequired as polygonErc1155IsAccessControlRequired,
  ERC1155Options as PolygonERC1155Options,
} from "../material/polygon/erc1155/erc1155";

export interface WizardContractAPI<Options extends CommonOptions> {
  print: (opts?: Options) => string;
  defaults: Required<Options>;
  isAccessControlRequired: (opts: Partial<Options>) => boolean;
}

export type ERC20 = WizardContractAPI<ERC20Options>;
export type ERC721 = WizardContractAPI<ERC721Options>;
export type ERC1155 = WizardContractAPI<ERC1155Options>;
export type KIP7 = WizardContractAPI<KIP7Options>;
export type KIP17 = WizardContractAPI<KIP17Options>;
export type KIP37 = WizardContractAPI<KIP37Options>;
export type BEP20 = WizardContractAPI<BEP20Options>;
export type BEP721 = WizardContractAPI<BEP721Options>;
export type BEP1155 = WizardContractAPI<BEP1155Options>;
export type Polygon_ERC20 = WizardContractAPI<PolygonERC20Options>;
export type Polygon_ERC721 = WizardContractAPI<PolygonERC721Options>;
export type Polygon_ERC1155 = WizardContractAPI<PolygonERC1155Options>;

export const erc20: ERC20 = {
  print: printERC20,
  defaults: erc20defaults,
  isAccessControlRequired: erc20IsAccessControlRequired,
};
export const erc721: ERC721 = {
  print: printERC721,
  defaults: erc721defaults,
  isAccessControlRequired: erc721IsAccessControlRequired,
};
export const erc1155: ERC1155 = {
  print: printERC1155,
  defaults: erc1155defaults,
  isAccessControlRequired: erc1155IsAccessControlRequired,
};
export const kip7: KIP7 = {
  print: printKIP7,
  defaults: kip7defaults,
  isAccessControlRequired: kip7IsAccessControlRequired,
};
export const kip17: KIP17 = {
  print: printKIP17,
  defaults: kip17defaults,
  isAccessControlRequired: kip17IsAccessControlRequired,
};
export const kip37: KIP37 = {
  print: printKIP37,
  defaults: kip37defaults,
  isAccessControlRequired: kip37IsAccessControlRequired,
};
export const bep20: BEP20 = {
  print: printBEP20,
  defaults: bep20defaults,
  isAccessControlRequired: bep20IsAccessControlRequired,
};
export const bep721: BEP721 = {
  print: printBEP721,
  defaults: bep721defaults,
  isAccessControlRequired: bep721IsAccessControlRequired,
};
export const bep1155: BEP1155 = {
  print: printBEP1155,
  defaults: bep1155defaults,
  isAccessControlRequired: bep1155IsAccessControlRequired,
};
export const polygon_erc20: Polygon_ERC20 = {
  print: polygonPrintERC20,
  defaults: polygonErc20defaults,
  isAccessControlRequired: polygonErc20IsAccessControlRequired,
};
export const polygon_erc721: Polygon_ERC721 = {
  print: polygonPrintERC721,
  defaults: polygonErc721defaults,
  isAccessControlRequired: polygonErc721IsAccessControlRequired,
};
export const polygon_erc1155: Polygon_ERC1155 = {
  print: polygonPrintERC1155,
  defaults: polygonErc1155defaults,
  isAccessControlRequired: polygonErc1155IsAccessControlRequired,
};
