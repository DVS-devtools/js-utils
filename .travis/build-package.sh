#!/usr/bin/env bash

set -ex

if [ ! -d "$1" ]; then
    echo "$1 does not exists, skipping"
    exit 0
fi;

lerna run lint --stream --scope $2

lerna run build --stream --scope $2

lerna run test --stream --scope $2
