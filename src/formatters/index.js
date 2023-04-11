import stylish from './stylish.js';

function formatDiff(diff, format) {
  switch (format) {
    case 'stylish': {
      return stylish(diff);
    }
    default: {
      throw new Error(`Unsupported output format: ${format}!`);
    }
  }
}

export default formatDiff;
