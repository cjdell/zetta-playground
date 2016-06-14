#!/bin/bash

curl -i \
    -H "Accept: application/json" \
    -H "X-HTTP-Method-Override: POST" \
    -X POST -d 'I am a light switch' \
    http://localhost:6789/
