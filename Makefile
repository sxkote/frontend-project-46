.PHONY: test

install-deps:
	npm ci

install: install-deps
	npx simple-git-hooks

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff: 
	node bin/gendiff.js './__tests__/__fixtures__/nested/file1.json' './__tests__/__fixtures__/nested/file2.json'
gendiff-stylish: 
	node bin/gendiff.js --format stylish './__tests__/__fixtures__/nested/file1.json' './__tests__/__fixtures__/nested/file2.json'
gendiff-plain: 
	node bin/gendiff.js --format plain './__tests__/__fixtures__/nested/file1.json' './__tests__/__fixtures__/nested/file2.json'
gendiff-h: 
	node bin/gendiff.js -h