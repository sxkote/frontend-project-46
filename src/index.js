import readData from './parsers.js';
import compareData from './compare.js';
import formatDiff from './formatters/index.js';

function gendiff(filepath1, filepath2, format = 'stylish') {
  const data1 = readData(filepath1);
  const data2 = readData(filepath2);
  const diff = compareData(data1, data2);
  return formatDiff(diff, format);
}

export default gendiff;
