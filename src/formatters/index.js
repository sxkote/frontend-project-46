import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

function formatDiff(diff, format) {
  switch (format) {
    case 'stylish': {
      return formatStylish(diff);
    }
    case 'plain': {
      return formatPlain(diff);
    }
    case 'json': {
      return formatJson(diff);
    }
    default: {
      throw new Error(`Unsupported output format: ${format}!`);
    }
  }
}

export default formatDiff;
