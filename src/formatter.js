import _ from 'lodash';

function buildPrefix(level, sign = ' ') {
  const spaces = ' '.repeat(4 * level);
  return `${spaces}  ${sign} `;
}

function formatJsonValue(value, level) {
  if (_.isObject(value)) {
    const output = Object.entries(value)
      .flatMap(([vKey, vValue]) => `${buildPrefix(level + 1)}${vKey}: ${formatJsonValue(vValue, level + 1)}`)
      .join('\n');
    return `{\n${output}\n${buildPrefix(level)}}`;
  }

  return (value === null) ? 'null' : value.toString();
}

function formatJsonOutput(diffItem, resultsArray, level = 0) {
  switch (diffItem.compare) {
    case 'equal': {
      resultsArray.push(`${buildPrefix(level, ' ')}${diffItem.key}: ${formatJsonValue(diffItem.value1, level)}`);
      break;
    }
    case 'different': {
      resultsArray.push(`${buildPrefix(level, '-')}${diffItem.key}: ${formatJsonValue(diffItem.value1, level)}`);
      resultsArray.push(`${buildPrefix(level, '+')}${diffItem.key}: ${formatJsonValue(diffItem.value2, level)}`);
      break;
    }
    case 'added': {
      resultsArray.push(`${buildPrefix(level, '+')}${diffItem.key}: ${formatJsonValue(diffItem.value2, level)}`);
      break;
    }
    case 'removed': {
      resultsArray.push(`${buildPrefix(level, '-')}${diffItem.key}: ${formatJsonValue(diffItem.value1, level)}`);
      break;
    }
    case 'children': {
      resultsArray.push(`${buildPrefix(level)}${diffItem.key}: {`);
      diffItem.children.forEach((item) => formatJsonOutput(item, resultsArray, level + 1));
      resultsArray.push(`${buildPrefix(level)}}`);
      break;
    }
    default: {
      throw new Error(`Unrecognized compare value: ${diffItem.compare}!`);
    }
  }
}

function formatOutput(diff, format) {
  const result = [];
  switch (format) {
    case 'stylish': {
      result.push('{');
      diff.forEach((item) => formatJsonOutput(item, result));
      result.push('}');
      break;
    }
    default: {
      throw new Error(`Unsupported output format: ${format}!`);
    }
  }

  return result.join('\n');
}

export default formatOutput;
