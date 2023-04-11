import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

describe('Gendiff tests', () => {
  it('should be valid diff-json', () => {
    const output = fs.readFileSync(getFixturePath('output-json.txt'), { encoding: 'utf8' });
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(result).toEqual(output);
  });

  it('should be valid diff-yaml', () => {
    const output = fs.readFileSync(getFixturePath('output-yaml.txt'), { encoding: 'utf8' });
    const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json');
    expect(result).toEqual(output);
  });
});
