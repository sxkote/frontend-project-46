#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format, <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(
    // eslint-disable-next-line no-underscore-dangle
    gendiff(filepath1, filepath2, program._optionValues.format),
  ));

program.parse();
