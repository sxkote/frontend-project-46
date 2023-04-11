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

function formatItem(item, level = 0) {
  switch (item.compare) {
    case 'equal': {
      return [buildComparisonText(item.key, item.value1, level, ' ')];
    }
    case 'updated': {
      return [buildComparisonText(item.key, item.value1, level, '-'), buildComparisonText(item.key, item.value2, level, '+')];
    }
    case 'added':
    case 'removed': {
      return [buildComparisonText(item.key, item.compare === 'removed' ? item.value1 : item.value2, level, item.compare === 'removed' ? '-' : '+')];
    }
    case 'children': {
      // eslint-disable-next-line no-use-before-define
      return _.concat(`${buildPrefix(level)}${item.key}: {`, formatItems(item.children, level + 1), `${buildPrefix(level)}}`);
    }
    default: {
      throw new Error(`Unrecognized compare type: ${item.compare}!`);
    }
  }
}

function formatItems(items, level = 0) {
  return _.flatten(items.map((item) => formatItem(item, level)));
}

function formatStylish(diff) {
  return _.concat('{', formatItems(diff), '}').join('\n');
}

export default formatStylish;
