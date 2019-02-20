#!/usr/bin/env bash

set -e

if git diff --name-only $1 | sort -u | uniq | grep $2; then
    echo "To build $PACKAGE"
fi


