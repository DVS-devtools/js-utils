#!/usr/bin/env bash

set -ex

echo git diff --name-only $1 | sort -u | uniq | grep $2

