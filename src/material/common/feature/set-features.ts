import { ContractBuilder } from "../../../utils/contract";

export enum Access {
  NONE,
  OWNABLE,
  ROLES,
}

export function setFeatures(c: ContractBuilder, features: any[]) {
  if (features.length > 0) {
    c.addConstructorCode(`_setFeatures([${features}]);`);
  }
}

export function setAccess(c: ContractBuilder, access: Access) {
  c.addConstructorCode(`_setAccess(${access});`);
}
