#!/bin/bash

TSCONFIG="tsconfig.lib.json"
while [[ $# -gt 0 ]]; do
    case $1 in
        --tsconfig)
            TSCONFIG="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

tsc --build "$TSCONFIG" && tsup --config ../../tsup.config.ts
