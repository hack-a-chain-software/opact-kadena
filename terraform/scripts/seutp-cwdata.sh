sudo apt-get update

sudo apt-get remove docker docker-engine docker.io containerd runc

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io

sudo groupadd docker

sudo usermod -aG docker $USER

sudo systemctl enable docker.service

sudo systemctl enable containerd.service

sudo apt-get install -y jq

cd ./indexer/chainweb-data

echo \"CWD_DB_HOST=${digitalocean_database_cluster.cwd-database.host}\" | sudo tee .env

echo \"CWD_DB_USER=doadmin\" | sudo tee -a .env

echo \"NODE_ENV=production\" | sudo tee -a .env

echo \"CWD_DB_PASS=${digitalocean_database_cluster.cwd-database.password}\" | sudo tee -a .env

echo \"CWD_DB_PORT=25060\" | sudo tee -a .env

echo \"CWD_DB_NAME=indexer\" | sudo tee -a .env

echo \"CWD_NODE=64.227.5.244\" | sudo tee -a .env

mkdir /tls

echo \"${data.digitalocean_database_ca.ca.certificate}\" | sudo tee /tls/do-ca.crt

npm install

npm run migrate

docker compose up chainweb-data -d
