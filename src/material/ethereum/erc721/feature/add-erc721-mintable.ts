import type { ContractBuilder } from "../../../contract";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";

export function addERC721Mintable(
  c: ContractBuilder,
  access: Access,
  incremental = false,
  uriStorage = false
) {
  const fn = getMintFunction(incremental, uriStorage);
  requireAccessControl(c, fn, access, "MINTER");

  if (incremental) {
    c.addUsing(
      {
        name: "Counters",
        path: "@hexlant/contracts/common/utils/Counters.sol",
      },
      "Counters.Counter"
    );
    c.addVariable("Counters.Counter private _tokenIdCounter;");
    c.addFunctionCode("uint256 tokenId = _tokenIdCounter.current();", fn);
    c.addFunctionCode("_tokenIdCounter.increment();", fn);
    c.addFunctionCode("_safeMint(to, tokenId);", fn);
  } else {
    c.addFunctionCode("_safeMint(to, tokenId);", fn);
  }

  if (uriStorage) {
    c.addFunctionCode("_setTokenURI(tokenId, uri);", fn);
  }
}

function getMintFunction(incremental: boolean, uriStorage: boolean) {
  const fn = {
    name: "safeMint",
    kind: "public" as const,
    args: [{ name: "to", type: "address" }],
  };

  if (!incremental) {
    fn.args.push({ name: "tokenId", type: "uint256" });
  }

  if (uriStorage) {
    fn.args.push({ name: "uri", type: "string memory" });
  }

  return fn;
}
