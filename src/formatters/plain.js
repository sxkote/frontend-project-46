import _ from 'lodash';

function formatValue(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
}

function formatItem(item, namePath = []) {
  const name = [...namePath, item.key].join('.');
  switch (item.compare) {
    case 'updated':
      return `Property '${name}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
    case 'added':
      return `Property '${name}' was added with value: ${formatValue(item.value2)}`;
    case 'removed':
      return `Property '${name}' was removed`;
    case 'children':
      return item.children.filter((ch) => ch.compare !== 'equal').map((ch) => formatItem(ch, [...namePath, item.key])).join('\n');
    default: {
      throw new Error(`Unrecognized compare type: ${item.compare}!`);
    }
  }
}

function formatPlain(diff) {
  return diff.filter((item) => item.compare !== 'equal').map((item) => formatItem(item)).join('\n');
}

export default formatPlain;
