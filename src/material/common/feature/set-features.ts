import { ContractBuilder } from "../../../utils/contract";

export function setFeatures(c: ContractBuilder, features: string[]) {
  if (features.length > 0) {
    c.addConstructorCode(`_setFeatures([${features}])`);
  }
}

export function setAccess(c: ContractBuilder, access: string) {
  c.addConstructorCode(`_setAccess(${access})`);
}
