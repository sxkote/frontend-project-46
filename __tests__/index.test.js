import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

describe('Gendiff flat tests', () => {
  let output;

  beforeEach(() => {
    output = fs.readFileSync(getFixturePath('flat/output.txt'), { encoding: 'utf8' });
  });

  it('stylish JSON diff should be valid', () => {
    const result = gendiff(getFixturePath('flat/file1.json'), getFixturePath('flat/file2.json'), 'stylish');
    expect(result).toEqual(output);
  });

  it('stylish YAML diff should be valid', () => {
    const result = gendiff(getFixturePath('flat/file1.yaml'), getFixturePath('flat/file2.yml'), 'stylish');
    expect(result).toEqual(output);
  });
});

describe('Gendiff nested tests', () => {
  let output;

  beforeEach(() => {
    output = fs.readFileSync(getFixturePath('nested/output.txt'), { encoding: 'utf8' });
  });

  it('Stylish JSON diff should be valid', () => {
    const result = gendiff(getFixturePath('nested/file1.json'), getFixturePath('nested/file2.json'), 'stylish');
    expect(result).toEqual(output);
  });

  it('Stylish YAML diff should be valid', () => {
    const result = gendiff(getFixturePath('nested/file1.yaml'), getFixturePath('nested/file2.yml'), 'stylish');
    expect(result).toEqual(output);
  });
});
