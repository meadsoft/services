#!/bin/bash

if ! grep -q "bashrc-addition" ~/.bashrc && [[ -f "${WORKSPACE_FOLDER}/.devcontainer/scripts/bashrc-addition.sh" ]]; then
    echo "source ${WORKSPACE_FOLDER}/.devcontainer/scripts/bashrc-addition.sh" >> ~/.bashrc
fi
