import {
  CommonOptions,
  defaults as commonDefaults,
  withCommonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { defineFunctions } from "../../../utils/define-functions";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC1155Burnable } from "./feature/add-erc1155-burnable";
import { addERC1155Mintable } from "./feature/add-erc1155-mintable";
import { addERC1155Pausable } from "./feature/add-erc1155-pausable";
import { addERC1155Supply } from "./feature/add-erc1155-supply";
import { addERC1155Base } from "./metadata/add-erc1155-base";
import { addERC1155URI } from "./metadata/add-erc1155-uri";

export interface ERC1155Options extends CommonOptions {
  name: string;
  uri: string;

  features: {
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    supply?: boolean;
    updatableUri?: boolean;
  };
}

export const defaults: Required<ERC1155Options> = {
  name: "MyToken",
  uri: "",
  features: {
    burnable: false,
    pausable: false,
    mintable: false,
    supply: false,
    updatableUri: true,
  },
  access: false,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: ERC1155Options): Required<ERC1155Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      supply: opts.features.supply ?? defaults.features.supply,
      updatableUri:
        opts.features.updatableUri ?? defaults.features.updatableUri,
    },
  };
}

export function printERC1155(opts: ERC1155Options = defaults): string {
  return printContract(buildERC1155(opts));
}

export function isAccessControlRequired(
  opts: Partial<ERC1155Options>
): boolean {
  return (opts.features?.mintable ||
    opts.features?.pausable ||
    opts.features?.updatableUri !== false) as boolean;
}

export function buildERC1155(opts: ERC1155Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addERC1155Base(c, allOpts.uri);

  if (allOpts.features.updatableUri) {
    addERC1155URI(c, access);
  }

  if (allOpts.features.pausable) {
    addERC1155Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.features.burnable) {
    addERC1155Burnable(c);
  }

  if (allOpts.features.mintable) {
    addERC1155Mintable(c, access);
  }

  if (allOpts.features.supply) {
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
