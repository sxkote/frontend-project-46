### Hexlet tests and linter status:
[![Actions Status](https://github.com/sxkote/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/sxkote/frontend-project-46/actions)
[![Node CI](https://github.com/sxkote/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/sxkote/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/da25c7f8d473aaf97b39/maintainability)](https://codeclimate.com/github/sxkote/frontend-project-46/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/da25c7f8d473aaf97b39/test_coverage)](https://codeclimate.com/github/sxkote/frontend-project-46/test_coverage)


# GenDiff

Gendiff - CLI utility compares two configuration files and shows a difference.

## Installation
```
$ make install
$ npm link
```

## Usage
Use `gendiff -h` to show help page
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version         output the version number
  -f, --format, <type>  output format (default: "json")
  -h, --help            output usage information
```

Supported output formats:

* `stylish (default)` 
* `plain`
* `json`

Use -f flag to set required output format. `-f, --format <type> output format`

----

## Examples

JSON Diff:

[![asciicast](https://asciinema.org/a/yqAiVHzc66gSr9Be3ASrZXnkN.svg)](https://asciinema.org/a/yqAiVHzc66gSr9Be3ASrZXnkN)

YAML Diff:

[![asciicast](https://asciinema.org/a/M1PIKl7XFyY371pHnunbjFWyR.svg)](https://asciinema.org/a/M1PIKl7XFyY371pHnunbjFWyR)

All Options:

[![asciicast](https://asciinema.org/a/Cw0UfoZqvY5qqWdcfrC8YajNX.svg)](https://asciinema.org/a/Cw0UfoZqvY5qqWdcfrC8YajNX)
