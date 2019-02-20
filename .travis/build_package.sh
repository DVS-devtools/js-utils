#!/usr/bin/env bash

echo git diff --name-only $1 | sort -u | uniq | grep $2

