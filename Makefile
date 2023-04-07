.PHONY: test

install: install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff: 
	node bin/gendiff.js
gendiff-h: 
	node bin/gendiff.js -h