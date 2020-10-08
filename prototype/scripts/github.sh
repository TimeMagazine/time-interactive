#!/bin/bash

OWNER=$1
REPO_NAME=$2

curl -H "Authorization: token 779c2a43fc6dfdb8617f7fdc250285b87da433c7" -H "Accept: application/vnd.github.baptiste-preview+json" https://api.github.com/repos/TimeMagazine/template/generate -d '{ "owner": "TimeMagazine", "name": "'"$REPO_NAME"'", "private": true }'
