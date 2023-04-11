import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

describe('Test json gendiff', () => {
  it('should be valid diff-json', () => {
    const output = fs.readFileSync(getFixturePath('output-json.txt'), { encoding: 'utf8' });
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(result).toEqual(output);
  });
});
