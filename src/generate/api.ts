import type { CommonOptions } from "../utils/common-options";
import {
  printERC20,
  defaults as erc20defaults,
  isAccessControlRequired as erc20IsAccessControlRequired,
  ERC20Options,
} from "../material/ethereum/erc20/erc20";
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
