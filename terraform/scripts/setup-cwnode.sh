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

cd ./indexer/chainweb-node

echo \"DB_SYNC_SERVER=${var.db_sync_server}\" | sudo tee .env

echo \"KADENA_NETWORK=${var.kadena_network}\" | sudo tee -a .env

chmod +x ./src/init-cwnode.sh

rm -r node_modules/

npm install

npm init-node
