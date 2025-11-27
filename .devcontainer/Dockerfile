FROM mcr.microsoft.com/devcontainers/typescript-node:dev-24-bookworm

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
# global node packages

RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN npm i -g @angular/cli --loglevel verbose
RUN npm i -g @nestjs/cli --loglevel verbose

#################################################
# Hoppscotch CLI

# RUN sudo apt-get install python g++ build-essential --yes && \
#     npm i -g @hoppscotch/cli

#################################################

ENTRYPOINT ["tail", "-f", "/dev/null"]
