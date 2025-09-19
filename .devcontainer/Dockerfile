FROM mcr.microsoft.com/devcontainers/typescript-node:dev-22-bookworm

#################################################
# general ubuntu
 
RUN apt update --yes &&  \
    apt upgrade --yes && \
    apt install git curl gnupg iputils-ping --yes
 
#################################################
# docker in docker
 
# RUN apt update --yes && \
#     apt upgrade --yes && \
#     apt install git ca-certificates curl python3 --yes && \
#     # Add Docker's official GPG key:
#     install -m 0755 -d /etc/apt/keyrings && \
#     curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
#     chmod a+r /etc/apt/keyrings/docker.asc && \
#     # Add the repository to Apt sources:
#     echo \
#     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
#     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
#     tee /etc/apt/sources.list.d/docker.list > /dev/null && \
#     apt-get update && \
#     apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin --yes
 
#################################################
# python
 
RUN apt install python3 -y && \
    apt install pipenv --yes && \
    pipenv install
 
#################################################
# node 20
 
ENV FNM_DIR=/opt/fnm
ENV FNM_INSTALL_VERSION=22
 
# install fnm (node version manager)
# https://github.com/cenk1cenk2/docker-node-fnm/blob/master/Dockerfile
SHELL ["bash", "-c"]
RUN apt-get update && \
    apt-get install -y curl unzip gnupg2 tini && \
    curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir ${FNM_DIR} && \
    ln -s ${FNM_DIR}/fnm /usr/bin/ && chmod +x /usr/bin/fnm && \
    # smoke test for fnm
    fnm -V && \
    # install latest node version as default
    eval "$(fnm env)" && \
    fnm install ${FNM_INSTALL_VERSION} && \
    fnm alias default ${FNM_INSTALL_VERSION} && \
    # add fnm for bash
    fnm use default && \
    /bin/ln -s "/opt/fnm/aliases/default/bin/node" /usr/bin/node && \
    /bin/ln -s "/opt/fnm/aliases/default/bin/npm" /usr/bin/npm && \
    /bin/ln -s "/opt/fnm/aliases/default/bin/npx" /usr/bin/npx && \
    # smoke test
    node -v && \
    npm -v
RUN npm i -g @angular/cli --loglevel verbose
 
#################################################
 
ENTRYPOINT ["tail", "-f", "/dev/null"]