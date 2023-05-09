Droplet
=====

Docker Compose Setup For A Chainweb Mining Node on Ubuntu 20.04.3 LTS (Focal Fossa)

Basic understanding of Linux and assuming a fresh install of Ubuntu 20.04.3 LTS and the following requirements are met:

Hardware requirements:

* 4 CPU cores,
* 8GB of RAM, and
* 256 GB of disk space.
* Network: public IP address or port forwarding

For supporting higher API loads we recommend to use at least 8 CPU cores and
16GB of RAM.

-----------------------------------------------------------------------------------

Prep for docker

```
sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get install ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install Docker Engine

```
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Post Installation for Linux

```
sudo groupadd docker

sudo usermod -aG docker $USER
```

--- Logout and log back in

Start Docker on boot

```
sudo systemctl enable docker.service

sudo systemctl enable containerd.service
```

Install Docker-compose V2

```
mkdir -p ~/.docker/cli-plugins/

curl -SL https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose

chmod +x ~/.docker/cli-plugins/docker-compose

# It should give you version 2.2.2
docker compose version
```

Install Chainweb-node client

```
git clone https://github.com/hack-a-chain-software/kadena-product.git

cd docker-compose-chainweb-node/mining-node

nano .env
```

All docker compose commands must be executed in the folder where docker-compose.yaml file is at. (/indexer);
