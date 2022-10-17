import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import {
  ERC721_DEFAULT,
  ERC721_ENUMERABLE,
  ERC721_URI_STORAGABLE,
} from "../../../path/erc721-path";
import { COUNTER } from "../../../path/util-path";

export function addERC721Base(
  c: ContractBuilder,
  name: string,
  symbol: string,
  incremental = false,
  access: Access
) {
  c.addParent(ERC721_DEFAULT, [name, symbol]);

  // Defaults
  c.addOverride(ERC721_DEFAULT.name, functions._beforeTokenTransfer);
  c.addOverride(ERC721_DEFAULT.name, functions._afterTokenTransfer);
  c.addOverride(ERC721_DEFAULT.name, functions._burn);
  c.addOverride(ERC721_DEFAULT.name, functions.tokenURI);
  c.addOverride(ERC721_DEFAULT.name, supportsInterface);

  // URIStoragable
  c.addParent(ERC721_URI_STORAGABLE);
  c.addOverride(ERC721_URI_STORAGABLE.name, functions._burn);
  c.addOverride(ERC721_URI_STORAGABLE.name, functions.tokenURI);

  // Enumerable
  c.addParent(ERC721_ENUMERABLE);
  c.addOverride(ERC721_ENUMERABLE.name, functions._beforeTokenTransfer);
  c.addOverride(ERC721_ENUMERABLE.name, supportsInterface);

  // Mintable
  // SafeMint
  if (incremental) {
    c.addUsing(COUNTER, "Counters.Counter");
    c.addVariable("Counters.Counter private _tokenIdCounter;");
    c.addFunctionCode("uint256 tokenId = _tokenIdCounter.current();", fn);
    c.addFunctionCode("_tokenIdCounter.increment();", fn);
  }

  const fn = getSafeMintFunction(incremental);
  requireAccessControl(c, fn, access, "MINTER");
  c.addFunctionCode("_safeMint(to, tokenId);", fn);
  c.addFunctionCode("_setTokenURI(tokenId, uri);", fn);

  // SafeMint
  const fn2 = getSafeMintFunctionWithData(incremental);
  requireAccessControl(c, fn2, access, "MINTER");
  c.addFunctionCode("_safeMint(to, tokenId, data);", fn2);
  c.addFunctionCode("_setTokenURI(tokenId, uri);", fn2);

  // Mint
  const fn3 = getMintFunction(incremental);
  requireAccessControl(c, fn3, access, "MINTER");
  c.addFunctionCode("_mint(to, tokenId);", fn3);
  c.addFunctionCode("_setTokenURI(tokenId, uri);", fn3);
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  },

  _afterTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  },

  _burn: {
    kind: "internal" as const,
    args: [{ name: "tokenId", type: "uint256" }],
  },

  tokenURI: {
    kind: "public" as const,
    args: [{ name: "tokenId", type: "uint256" }],
    returns: ["string memory"],
    mutability: "view" as const,
  },
});

function getSafeMintFunction(incremental: boolean) {
  const fn = {
    name: "safeMint",
    kind: "public" as const,
    args: [{ name: "to", type: "address" }],
  };

  if (!incremental) {
    fn.args.push({ name: "tokenId", type: "uint256" });
  }

  fn.args.push({ name: "uri", type: "string memory" });

  return fn;
}

function getSafeMintFunctionWithData(incremental: boolean) {
  const fn = {
    name: "safeMint",
    kind: "public" as const,
    args: [{ name: "to", type: "address" }],
  };

  if (!incremental) {
    fn.args.push({ name: "tokenId", type: "uint256" });
  }

  fn.args.push({ name: "uri", type: "string memory" });
  fn.args.push({ name: "data", type: "bytes memory" });

  return fn;
}

function getMintFunction(incremental: boolean) {
  const fn = {
    name: "mint",
    kind: "public" as const,
    args: [{ name: "to", type: "address" }],
  };

  if (!incremental) {
    fn.args.push({ name: "tokenId", type: "uint256" });
  }

  fn.args.push({ name: "uri", type: "string memory" });

  return fn;
}
