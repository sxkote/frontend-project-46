import _ from 'lodash';

function buildPrefix(level, sign = ' ') {
  const spaces = ' '.repeat(4 * level);
  return `${spaces}  ${sign} `;
}

function formatStylishValue(value, level) {
  if (_.isObject(value)) {
    const output = Object.entries(value)
      .flatMap(([vKey, vValue]) => `${buildPrefix(level + 1)}${vKey}: ${formatStylishValue(vValue, level + 1)}`)
      .join('\n');
    return `{\n${output}\n${buildPrefix(level)}}`;
  }

  return (value === null) ? 'null' : value.toString();
}

function formatStylishItem(item, resultsArray, level = 0) {
  switch (item.compare) {
    case 'equal': {
      resultsArray.push(`${buildPrefix(level, ' ')}${item.key}: ${formatStylishValue(item.value1, level)}`);
      break;
    }
    case 'different': {
      resultsArray.push(`${buildPrefix(level, '-')}${item.key}: ${formatStylishValue(item.value1, level)}`);
      resultsArray.push(`${buildPrefix(level, '+')}${item.key}: ${formatStylishValue(item.value2, level)}`);
      break;
    }
    case 'added':
    case 'removed': {
      const isRemoved = item.compare === 'removed';
      resultsArray.push(`${buildPrefix(level, isRemoved ? '-' : '+')}${item.key}: ${formatStylishValue(isRemoved ? item.value1 : item.value2, level)}`);
      break;
    }
    case 'children': {
      resultsArray.push(`${buildPrefix(level)}${item.key}: {`);
      item.children.forEach((child) => formatStylishItem(child, resultsArray, level + 1));
      resultsArray.push(`${buildPrefix(level)}}`);
      break;
    }
    default: {
      throw new Error(`Unrecognized compare type: ${item.compare}!`);
    }
  }
}

function formatStylish(diff) {
  const resultsArray = [];
  resultsArray.push('{');
  diff.forEach((item) => formatStylishItem(item, resultsArray));
  resultsArray.push('}');
  return resultsArray.join('\n');
}

export default formatStylish;
