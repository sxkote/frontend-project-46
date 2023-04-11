function formatJsonOutput(diffItem, resultsArray) {
  switch (diffItem.compare) {
    case 'equal': {
      resultsArray.push(`    ${diffItem.key}: ${diffItem.value1}`);
      break;
    }
    case 'different': {
      resultsArray.push(`  - ${diffItem.key}: ${diffItem.value1}`);
      resultsArray.push(`  + ${diffItem.key}: ${diffItem.value2}`);
      break;
    }
    case 'added': {
      resultsArray.push(`  + ${diffItem.key}: ${diffItem.value2}`);
      break;
    }
    case 'removed': {
      resultsArray.push(`  - ${diffItem.key}: ${diffItem.value1}`);
      break;
    }
    default:
      throw new Error('Unrecognized compare value!');
  }
}

function formatOutput(diff, format) {
  const result = [];
  switch (format) {
    case 'json':
    {
      result.push('{');
      diff.forEach((item) => formatJsonOutput(item, result));
      result.push('}');
      break;
    }
    default: {
      throw new Error('Unsupported output format!');
    }
  }

  return result.join('\n');
}

export default formatOutput;
