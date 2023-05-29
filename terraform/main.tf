# The provider "digitalocean" block defines the configuration for the DigitalOcean provider, which allows interaction with DigitalOcean resources.
# The "token" parameter is set to the value of the variable "var.do_token", which should contain a valid DigitalOcean API token.
provider "digitalocean" {
  token = var.do_token
}

# The resource "digitalocean_ssh_key" represents an SSH key that can be associated with Droplets to enable SSH access.
resource "digitalocean_ssh_key" "opact-ssh" {
  name = "opact-ssh"

  public_key = file(var.pub_key)
}

# The resource "digitalocean_database_cluster" represents the configuration for the database cluster named "chainweb-database".
# The cluster is set up with PostgreSQL as the engine, version 15. The cluster is associated with the project specified by the variable "project_id".
resource "digitalocean_database_cluster" "chainweb-database" {
  name = "chainweb-database"
  engine = "pg"
  version = "15"
  size = "db-s-1vcpu-2gb"
  region = "nyc1"
  node_count = 1
  project_id = var.project_id
}

# The resource "digitalocean_database_db" defines a database instance within the cluster.
# The instance is named "indexer" and is associated with the database cluster "chainweb-database" using its ID.
resource "digitalocean_database_db" "indexer" {
  name = "indexer"

  cluster_id = digitalocean_database_cluster.chainweb-database.id
}

# In summary, this resource defines the creation of a DigitalOcean Droplet named "chainweb-data"
# with specific configuration and provisions it with necessary software and configurations to run the "chainweb-data" Docker container.
resource "digitalocean_droplet" "chainweb-data" {
  region = "nyc1"

  size = "s-1vcpu-2gb"

  name = "chainweb-data"

  image = "ubuntu-22-04-x64"

  # The SSH key specified by "digitalocean_ssh_key.opact-ssh.fingerprint" is added to the Droplet's authorized keys, allowing SSH access
  ssh_keys = [
    digitalocean_ssh_key.opact-ssh.fingerprint
  ]

  depends_on = [
    null_resource.init_db,
    digitalocean_droplet.chainweb-node,
  ]

  # The connection block specifies the SSH connection details, including the user, host (obtained from the Droplet's IPv4 address), SSH key file, and connection timeout.
  connection {
    user = "root"
    host = self.ipv4_address
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  # The "file" provisioner copies the directory "../indexer/chainweb-data" to the "/root" directory on the Droplet.
  provisioner "file" {
    source = "../indexer/chainweb-data"
    destination = "/root"
  }

  # The "remote-exec" provisioner executes a series of commands remotely on the Droplet using SSH.
  # These commands involve updating the system, installing Docker and its dependencies, configuring Docker services, installing additional packages like "jq", setting environment variables in the ".env" file, and finally, running a Docker container named "chainweb-data".
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
      "sudo usermod -aG docker root",
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

# The "null_resource" resource block represents a resource that doesn't create any infrastructure itself but can be used to trigger actions or perform local operations.
# In this case, it is used to initialize a database
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

# In summary, this resource defines the creation of a DigitalOcean Droplet named "chainweb-node"
# with specific configuration and provisions it with necessary software and configurations to run a Kadena's Chainweb Node.
resource "digitalocean_droplet" "chainweb-node" {
  name = "chainweb-node"
  image = "ubuntu-22-04-x64"
  region = "nyc1"
  size = "s-8vcpu-16gb"

  # The SSH key specified by "digitalocean_ssh_key.opact-ssh.fingerprint" is added to the Droplet's authorized keys, allowing SSH access
  ssh_keys = [
    digitalocean_ssh_key.opact-ssh.fingerprint
  ]

  # The connection block specifies the SSH connection details, including the user, host (obtained from the Droplet's IPv4 address), SSH key file, and connection timeout.
  connection {
    user = "root"
    host = self.ipv4_address
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  # The "file" provisioner copies the "../indexer/chainweb-node" directory to the "/root" directory on the Droplet
  provisioner "file" {
    source = "../indexer/chainweb-node"
    destination = "/root"
  }

  # The "file" provisioner copies the "../indexer/chainweb-node/src/cwnode.service" file to the "/etc/systemd/system/cwnode.service" path on the Droplet.
  provisioner "file" {
    source = "../indexer/chainweb-node/src/cwnode.service"
    destination = "/etc/systemd/system/cwnode.service"
  }

  # The provisioner "remote-exec" block specifies a series of commands to be executed remotely on the Droplet.
  # These commands update the package repositories, install Docker, configure Docker service, install additional packages, set environment variables in the ".env" file, reload systemd, enable the "cwnode.service" systemd unit, and start the "cwnode.service" service.
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

# The resource "digitalocean_floating_ip" represents the configuration for a floating IP address.
# It is assigned to the Droplet specified by the attribute "droplet_id", which references the ID of the "chainweb-node" Droplet.
# The floating IP is assigned in the same region as the "chainweb-node" Droplet, which is obtained from the "region" attribute of the "chainweb-node" Droplet.
resource "digitalocean_floating_ip" "chainweb-node-ip" {
  droplet_id = digitalocean_droplet.chainweb-node.id
  region = digitalocean_droplet.chainweb-node.region
}
