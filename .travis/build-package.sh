#!/usr/bin/env bash

set -ex

if [ ! -d "$PACKAGE" ]; then
    echo "$PACKAGE does not exists, skipping"
    exit 0
fi;

lerna run lint --stream --scope $SCOPE

lerna run build --stream --scope $SCOPE

lerna run test --stream --scope $SCOPE
