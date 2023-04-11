function defineItemValue(item) {
  switch (item.compare) {
    case 'equal':
    case 'added':
    case 'updated':
      return item.value2;
    case 'children':
      // eslint-disable-next-line no-use-before-define
      return formatItems(item.children);
    default:
      return undefined;
  }
}

function defineItemOldValue(item) {
  switch (item.compare) {
    case 'updated':
    case 'removed':
      return item.value1;
    default:
      return undefined;
  }
}

function formatItems(items) {
  return items.map((item) => {
    const value = defineItemValue(item);
    const oldValue = defineItemOldValue(item);
    // eslint-disable-next-line object-curly-newline
    return { key: item.key, type: item.compare, value, oldValue };
  });
}

function formatJson(diff) {
  return JSON.stringify(formatItems(diff));
}

export default formatJson;
