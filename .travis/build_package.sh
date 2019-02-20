#!/usr/bin/env bash

set -e

if git diff --name-only $1 | sort -u | uniq | grep $2 > dev/null; then
    echo "To build $PACKAGE"
fi


