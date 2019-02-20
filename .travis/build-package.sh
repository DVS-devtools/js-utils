#!/usr/bin/env bash

set -ex

cd $PACKAGE

npm run lint

npm run build

npm run test

