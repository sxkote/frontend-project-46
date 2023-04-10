import * as path from 'path';
import { cwd } from 'node:process';
import fs from 'fs';

function normalizePath(filepath) {
  if (filepath.includes(cwd())) {
    return filepath;
  }
  return path.resolve(cwd(), filepath);
}

export default (filepath, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fs.readFileSync(normalizePath(filepath)));
    default:
      throw new Error('Unrecognized file format!');
  }
};
