import {
  CommonOptions,
  defaults as commonDefaults,
  withCommonDefaults,
} from "../../common-options";
import { Contract, ContractBuilder } from "../../contract";
import { printContract } from "../../print";
import { defineFunctions } from "../../../utils/define-functions";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC1155Burnable } from "./feature/add-erc1155-burnable";
import { addERC1155Mintable } from "./feature/add-erc1155-mintable";
import { addERC1155Pausable } from "./feature/add-erc1155-pausable";
import { addERC1155Supply } from "./feature/add-erc1155-supply";
import { addERC1155Base } from "./metadata/add-erc1155-base";
import { addERC1155URI } from "./metadata/add-erc721-uri";

export interface ERC1155Options extends CommonOptions {
  name: string;
  uri: string;

  burnable?: boolean;
  pausable?: boolean;
  mintable?: boolean;
  supply?: boolean;
  updatableUri?: boolean;
}

export const defaults: Required<ERC1155Options> = {
  name: "MyToken",
  uri: "",

  burnable: false,
  pausable: false,
  mintable: false,
  supply: false,
  updatableUri: true,
  access: false,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: ERC1155Options): Required<ERC1155Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    burnable: opts.burnable ?? defaults.burnable,
    pausable: opts.pausable ?? defaults.pausable,
    mintable: opts.mintable ?? defaults.mintable,
    supply: opts.supply ?? defaults.supply,
    updatableUri: opts.updatableUri ?? defaults.updatableUri,
  };
}

export function printERC1155(opts: ERC1155Options = defaults): string {
  return printContract(buildERC1155(opts));
}

export function isAccessControlRequired(
  opts: Partial<ERC1155Options>
): boolean {
  return (opts.mintable ||
    opts.pausable ||
    opts.updatableUri !== false) as boolean;
}

export function buildERC1155(opts: ERC1155Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addERC1155Base(c, allOpts.uri);

  if (allOpts.updatableUri) {
    addERC1155URI(c, access);
  }

  if (allOpts.pausable) {
    addERC1155Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.burnable) {
    addERC1155Burnable(c);
  }

  if (allOpts.mintable) {
    addERC1155Mintable(c, access);
  }

  if (allOpts.supply) {
    addERC1155Supply(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "operator", type: "address" },
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[] memory" },
      { name: "amounts", type: "uint256[] memory" },
      { name: "data", type: "bytes memory" },
    ],
  },
});
