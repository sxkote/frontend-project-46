import _ from 'lodash';

function getKeys(data1, data2) {
  return _.union(Object.keys(data1).concat(Object.keys(data2)));
}

function compareValues(value1, value2) {
  if (value1 === value2) {
    return 'equal';
  }

  if (value1 === undefined) {
    return 'added';
  }

  if (value2 === undefined) {
    return 'removed';
  }

  return 'different';
}

function compareData(data1, data2) {
  const result = getKeys(data1, data2).map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const compare = compareValues(value1, value2);
    // eslint-disable-next-line object-curly-newline
    return { key, value1, value2, compare };
  });

  return _.sortBy(result, (item) => item.key);
}

export default compareData;
