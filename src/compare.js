import _ from 'lodash';

function getKeys(data1, data2) {
  return _.union(Object.keys(data1).concat(Object.keys(data2)));
}

function buildComparison(key, value1, value2, compare, children) {
  // eslint-disable-next-line object-curly-newline
  return { key, value1, value2, compare, children };
}

function compareDataKey(data1, data2, key) {
  const value1 = data1[key];
  const value2 = data2[key];

  const build = (compare, ch = undefined) => buildComparison(key, value1, value2, compare, ch);

  if (_.isObject(value1) && _.isObject(value2)) {
    // eslint-disable-next-line no-use-before-define
    return build('children', compareData(value1, value2));
  }

  if (value1 === value2) {
    return build('equal');
  }

  if (value1 === undefined) {
    return build('added');
  }

  if (value2 === undefined) {
    return build('removed');
  }

  return build('different');
}

function compareData(data1, data2) {
  const result = getKeys(data1, data2).map((key) => compareDataKey(data1, data2, key));

  return _.sortBy(result, (item) => item.key);
}

export default compareData;
