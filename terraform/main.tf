provider "digitalocean" { token = var.do_token }

resource "digitalocean_ssh_key" "opact-ssh" {
  name = "opact-ssh"
  public_key = file(var.pub_key)
}

resource "digitalocean_database_cluster" "chainweb-database" {
  name = "chainweb-database"
  engine = "pg"
  version = "15"
  size = "db-s-1vcpu-2gb"
  region = "nyc1"
  node_count = 1
  project_id = var.project_id
}

resource "digitalocean_database_db" "indexer" {
  cluster_id = digitalocean_database_cluster.chainweb-database.id
  name = "indexer"
}

resource "digitalocean_database_db" "indexer_shadow" {
  cluster_id = digitalocean_database_cluster.chainweb-database.id
  name = "indexer_shadow"
}

resource "digitalocean_droplet" "chainweb-data" {
  depends_on = [
    null_resource.init_db,
    digitalocean_droplet.chainweb-node,
  ]

  name = "chainweb-data"
  image = "ubuntu-22-04-x64"
  region = "nyc1"
  size = "s-1vcpu-2gb"

  ssh_keys = [digitalocean_ssh_key.opact-ssh.fingerprint]

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
      "echo \"CWD_DB_HOST=${digitalocean_database_cluster.chainweb-database.host}\" | sudo tee .env",
      "echo \"CWD_DB_USER=${digitalocean_database_cluster.chainweb-database.user}\" | sudo tee -a .env",
      "echo \"CWD_DB_PASS=${digitalocean_database_cluster.chainweb-database.password}\" | sudo tee -a .env",
      "echo \"CWD_DB_PORT=25060\" | sudo tee -a .env",
      "echo \"CWD_DB_NAME=indexer\" | sudo tee -a .env",
      "echo \"CWD_NODE=${digitalocean_floating_ip.chainweb-node-ip.ip_address}\" | sudo tee -a .env",
      "cd ./chainweb-data",
      "docker compose up chainweb-data -d",
    ]
  }
}

resource "null_resource" "init_db" {
  triggers = {
    schema_file = filebase64sha256(
      "../indexer/chainweb-data/src/init.sql"
    )
  }

  provisioner "local-exec" {
    command = <<EOF
      export PGPASSWORD=${digitalocean_database_cluster.chainweb-database.password}

      psql -h ${digitalocean_database_cluster.chainweb-database.host} -U ${digitalocean_database_cluster.chainweb-database.user} -d ${digitalocean_database_db.indexer.name} -p 25060 -f ../indexer/chainweb-data/src/init.sql
    EOF
  }
}

resource "digitalocean_droplet" "chainweb-node" {
  name = "chainweb-node"
  image = "ubuntu-22-04-x64"
  region = "nyc1"
  size = "s-8vcpu-16gb"

  ssh_keys = [digitalocean_ssh_key.opact-ssh.fingerprint]

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
      "systemctl start cwnode.service"
    ]
  }
}

resource "digitalocean_floating_ip" "chainweb-node-ip" {
  droplet_id = digitalocean_droplet.chainweb-node.id
  region = digitalocean_droplet.chainweb-node.region
}
