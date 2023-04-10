function formatOutput(diff, format) {
  const result = [];
  switch (format) {
    case 'json':
    {
      result.push('{');
      diff.forEach((item) => {
        switch (item.compare) {
          case 'equal': {
            result.push(`    ${item.key}: ${item.value1}`);
            break;
          }
          case 'different': {
            result.push(`  - ${item.key}: ${item.value1}`);
            result.push(`  + ${item.key}: ${item.value2}`);
            break;
          }
          case 'added': {
            result.push(`  + ${item.key}: ${item.value2}`);
            break;
          }
          case 'removed': {
            result.push(`  - ${item.key}: ${item.value1}`);
            break;
          }
          default:
            throw new Error('Unrecognized compare value!');
        }
      });
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
