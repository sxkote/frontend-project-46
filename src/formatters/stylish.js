import _ from 'lodash';

function buildPrefix(level, sign = ' ') {
  const spaces = ' '.repeat(4 * level);
  return `${spaces}  ${sign} `;
}

function formatValue(value, level) {
  if (_.isObject(value)) {
    const output = Object.entries(value)
      .flatMap(([vKey, vValue]) => `${buildPrefix(level + 1)}${vKey}: ${formatValue(vValue, level + 1)}`)
      .join('\n');
    return `{\n${output}\n${buildPrefix(level)}}`;
  }

  return (value === null) ? 'null' : value.toString();
}

function buildComparisonText(key, value, level, sign) {
  return `${buildPrefix(level, sign)}${key}: ${formatValue(value, level)}`;
}

function formatItem(item, resultsArray, level = 0) {
  switch (item.compare) {
    case 'equal': {
      resultsArray.push(buildComparisonText(item.key, item.value1, level, ' '));
      break;
    }
    case 'different': {
      resultsArray.push(buildComparisonText(item.key, item.value1, level, '-'));
      resultsArray.push(buildComparisonText(item.key, item.value2, level, '+'));
      break;
    }
    case 'added':
    case 'removed': {
      resultsArray.push(buildComparisonText(item.key, item.compare === 'removed' ? item.value1 : item.value2, level, item.compare === 'removed' ? '-' : '+'));
      break;
    }
    case 'children': {
      resultsArray.push(`${buildPrefix(level)}${item.key}: {`);
      item.children.forEach((child) => formatItem(child, resultsArray, level + 1));
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
  diff.forEach((item) => formatItem(item, resultsArray));
  resultsArray.push('}');
  return resultsArray.join('\n');
}

export default formatStylish;
