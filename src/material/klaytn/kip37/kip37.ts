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
import { addKIP37Burnable } from "./feature/add-kip37-burnable";
import { addKIP37Mintable } from "./feature/add-kip37-mintable";
import { addKIP37Pausable } from "./feature/add-kip37-pausable";
import { addKIP37Supply } from "./feature/add-kip37-supply";
import { addKIP37Base } from "./metadata/add-kip37-base";
import { addKIP37URI } from "./metadata/add-kip37-uri";

export interface KIP37Options extends CommonOptions {
  name: string;
  uri: string;

  burnable?: boolean;
  pausable?: boolean;
  mintable?: boolean;
  supply?: boolean;
  updatableUri?: boolean;
}

export const defaults: Required<KIP37Options> = {
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

function withDefaults(opts: KIP37Options): Required<KIP37Options> {
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

export function printKIP37(opts: KIP37Options = defaults): string {
  return printContract(buildKIP37(opts));
}

export function isAccessControlRequired(opts: Partial<KIP37Options>): boolean {
  return (opts.mintable ||
    opts.pausable ||
    opts.updatableUri !== false) as boolean;
}

export function buildKIP37(opts: KIP37Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addKIP37Base(c, allOpts.uri);

  if (allOpts.updatableUri) {
    addKIP37URI(c, access);
  }

  if (allOpts.pausable) {
    addKIP37Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.burnable) {
    addKIP37Burnable(c);
  }

  if (allOpts.mintable) {
    addKIP37Mintable(c, access);
  }

  if (allOpts.supply) {
    addKIP37Supply(c);
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
