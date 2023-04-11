import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);
const outputFormats = ['stylish', 'plain'];

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

outputFormats.forEach((format) => {
  describe(`Gendiff nested tests for '${format}' format`, () => {
    let output;

    beforeEach(() => {
      output = fs.readFileSync(getFixturePath(`nested/output-${format}.txt`), { encoding: 'utf8' });
    });

    it(`JSON diff should be valid for '${format}' format`, () => {
      const result = gendiff(getFixturePath('nested/file1.json'), getFixturePath('nested/file2.json'), format);
      expect(result).toEqual(output);
    });

    it(`YAML diff should be valid for '${format}' format`, () => {
      const result = gendiff(getFixturePath('nested/file1.yaml'), getFixturePath('nested/file2.yml'), format);
      expect(result).toEqual(output);
    });
  });
});
