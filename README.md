# js-utils

[![Build Status](https://travis-ci.com/docomodigital/js-utils.svg?branch=master)](https://travis-ci.com/docomodigital/js-utils)
[![Coverage Status](https://coveralls.io/repos/github/docomodigital/js-utils/badge.svg?branch=master)](https://coveralls.io/github/docomodigital/js-utils?branch=master)

## Docomodigital Monorepo with all common Vanilla Js libraries.

Packages on this repo are not dependent to each other, this monorepo exists only to simplify the development process, sharing all the development tools (webpack, babel, jest, eslint...) to all the packages

## Usage

This repo uses [Lerna](https://github.com/lerna/lerna), so every lerna commands are available.

**Common cli command flags**

Add `--stream` flag to show a better formatted console output for every package process

Add a `--scope [package.json name][]` flag to run the command only on the specified packages

### Start the Dev server for one or more packages
```bash
$ lerna run start [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run start
```

### Run the tests for one or more packages
```bash
$ npm [yarn] run test:all
```
Or:
```bash
$ lerna run test [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run test
```
Other test scripts:
* `lerna [npm - yarn] run test:watch` (watch files and rerun tests on file change)
* `lerna [npm - yarn] run test:open` (run the tests and open the html coverage results)
* `lerna [npm - yarn] run test:coveralls` (run the tests and send the coverage results to [Coveralls](https://coveralls.io))

### Run the linter (eslint)
```bash
$ npm [yarn] run lint:all
```
Or:
```bash
$ lerna run lint [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run lint
```

### Build the package for release
```bash
$ npm [yarn] run build:all
```
Or:
```bash
$ lerna run build [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run build
```

### Generate the package docs with the current package version
```bash
$ npm [yarn] run doc:all
```
Or:
```bash
$ lerna run doc [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run doc
```

### Generate the package docs with the current package version in a "latest" folder
```bash
$ npm [yarn] run doc:latest:all
```
Or:
```bash
$ lerna run doc:latest [--stream] [--scope name]
```
Or:
```bash
$ cd packages/PACKAGENAME
$ npm [yarn] run doc:latest
```
