terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "pvt_key" {
  description = "Path for SSH"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "pub_key" {
  description = "Path for Pub SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "do_token" {
  description = "Digital Ocean API token"
  type        = string
}

variable "project_id" {
  description = "Digital Ocean Project"
  type        = string
}

variable "db_sync_server" {
  description = "Kadena chainweb-node host"
  type        = string
  default     = "us-w1.chainweb.com"
}

variable "kadena_network" {
  description = "Kadena network"
  type        = string
  default     = "mainnet01"
}

provider "digitalocean" { token = var.do_token }

resource "digitalocean_ssh_key" "opact-protocol" {
  name       = "tf"
  public_key = file(var.pub_key)
}

resource "digitalocean_database_cluster" "cwd-database" {
  name = "cwd-database"
  engine = "pg"
  version = "15"
  size = "db-s-1vcpu-2gb"
  region = "nyc1"
  node_count = 1
  project_id = var.project_id
}

resource "digitalocean_database_db" "indexer" {
  cluster_id = digitalocean_database_cluster.cwd-database.id
  name = "indexer"
}

resource "digitalocean_database_db" "indexer_shadow" {
  cluster_id = digitalocean_database_cluster.cwd-database.id
  name = "indexer_shadow"
}

data "digitalocean_database_ca" "ca" {
  cluster_id = digitalocean_database_cluster.cwd-database.id
}

resource "digitalocean_droplet" "chainweb-data" {
  depends_on = [ digitalocean_database_cluster.cwd-database ]
  name = "chainweb-data"
  image = "ubuntu-22-04-x64"
  region = "nyc1"
  size = "s-1vcpu-2gb"

  ssh_keys = [digitalocean_ssh_key.hac.fingerprint]

  connection {
    user = "root"
    host = self.ipv4_address
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  provisioner "file" {
    source = "../indexer/chainweb-data"
    destination = "/root"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get remove docker docker-engine docker.io containerd runc",
      "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -",
      "sudo apt-get install -y nodejs",
      "sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "sudo apt-get update",
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io",
      "sudo groupadd docker",
      "sudo usermod -aG docker $USER",
      "sudo systemctl enable docker.service",
      "sudo systemctl enable containerd.service",
      "sudo apt-get install -y jq",
      "cd ./chainweb-data",
      "echo \"CWD_DB_HOST=${digitalocean_database_cluster.cwd-database.host}\" | sudo tee .env",
      "echo \"CWD_DB_USER=doadmin\" | sudo tee -a .env",
      "echo \"NODE_ENV=production\" | sudo tee -a .env",
      "echo \"CWD_DB_PASS=${digitalocean_database_cluster.cwd-database.password}\" | sudo tee -a .env",
      "echo \"CWD_DB_PORT=25060\" | sudo tee -a .env",
      "echo \"CWD_DB_NAME=indexer\" | sudo tee -a .env",
      "echo \"CWD_NODE=64.227.5.244\" | sudo tee -a .env",
      "mkdir /tls",
      "echo \"${data.digitalocean_database_ca.ca.certificate}\" | sudo tee /tls/do-ca.crt",
      "npm install",
      "npm run migrate",
      "docker compose up chainweb-data -d",
    ]
  }
}

resource "digitalocean_droplet" "chainweb-node" {
  # depends_on = [ digitalocean_database_cluster.cwd-database ]
  name = "chainweb-node"
  image = "ubuntu-22-04-x64"
  region = "nyc1"
  size = "s-8vcpu-16gb"

  ssh_keys = [digitalocean_ssh_key.opact-protocol.fingerprint]

  connection {
    user = "root"
    host = self.ipv4_address
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  provisioner "file" {
    source = "../indexer/chainweb-node"
    destination = "/root"
  }

  provisioner "file" {
    source = "../indexer/chainweb-node/src/cwnode.service"
    destination = "/etc/systemd/system/cwnode.service"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get remove docker docker-engine docker.io containerd runc",
      "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -",
      "sudo apt-get install -y nodejs",
      "sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "sudo apt-get update",
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io",
      "sudo groupadd docker",
      "sudo usermod -aG docker $USER",
      "sudo systemctl enable docker.service",
      "sudo systemctl enable containerd.service",
      "sudo apt-get install -y jq",
      "echo \"DB_SYNC_SERVER=${var.db_sync_server}\" | sudo tee .env",
      "echo \"KADENA_NETWORK=${var.kadena_network}\" | sudo tee -a .env",
      "systemctl daemon-reload",
      "systemctl enable cwnode.service",
      "systemctl start cwnode.service",
    ]
  }
}
