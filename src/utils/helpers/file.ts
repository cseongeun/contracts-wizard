import * as fs from "fs";

export function existsFile(filePath: any) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
