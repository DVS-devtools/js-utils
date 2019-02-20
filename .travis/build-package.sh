#!/usr/bin/env bash

set -ex

echo $PWD
echo $CWD

cd $PACKAGE

npm run lint

npm run build

npm run test

