import * as path from 'path';
import readData from './parsers.js';
import compareData from './compare.js';
import formatOutput from './formatter.js';

function gendiff(filepath1, filepath2, format) {
  const data1 = readData(filepath1, path.extname(path.basename(filepath1)));
  const data2 = readData(filepath2, path.extname(path.basename(filepath2)));
  const diff = compareData(data1, data2);
  return formatOutput(diff, format);
}

export default gendiff;
