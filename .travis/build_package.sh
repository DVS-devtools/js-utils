#!/usr/bin/env bash

set -e

if git diff --name-only $1 | sort -u | uniq | grep $2 >> div/null; then
    echo "To build $PACKAGE"
fi


