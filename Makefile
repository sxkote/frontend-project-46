.PHONY: test

install: install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff: 
	node bin/gendiff.js file1.json file2.json
gendiff-h: 
	node bin/gendiff.js -h