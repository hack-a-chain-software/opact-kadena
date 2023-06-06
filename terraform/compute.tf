resource "aws_eip" "chainweb_node_ip" {
  instance = aws_instance.chainweb-node.id
  vpc      = true
}

resource "aws_instance" "chainweb_data" {
  ami           = "ami-004dac467bb041dc7"
  instance_type = "t2.micro"
  associate_public_ip_address = true

  subnet_id = "${aws_subnet.indexer.id}"

  key_name = "${aws_key_pair.opact-ssh.key_name}"

  tags = {
    Name = "chainweb-data"
  }

  vpc_security_group_ids      = ["${aws_security_group.indexer.id}"]

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file(var.pvt_key)
    host        = self.public_ip
  }

  provisioner "file" {
    source      = "../indexer/chainweb-data"
    destination = "."
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
      "sudo usermod -aG docker ubuntu",
      "sudo systemctl enable docker.service",
      "sudo systemctl enable containerd.service",
      "sudo apt-get install -y jq",
      "cd ./chainweb-data",
      "echo \"CWD_DB_HOST=${aws_db_instance.chainweb_database.address}\" | sudo tee .env",
      "echo \"CWD_DB_USER=${aws_db_instance.chainweb_database.username}\" | sudo tee -a .env",
      "echo \"CWD_DB_PASS=${aws_db_instance.chainweb_database.password}\" | sudo tee -a .env",
      "echo \"CWD_DB_PORT=5432\" | sudo tee -a .env",
      "echo \"CWD_DB_NAME=indexer\" | sudo tee -a .env",
      "echo \"CWD_NODE=146.190.198.163\" | sudo tee -a .env",
      "sudo setfacl --modify user:ubuntu:rw /var/run/docker.sock",
      "sudo docker compose up chainweb-data -d",
    ]
  }
}

# In summary, this resource defines the creation of an AWS EC2 instance named "chainweb-node"
# with specific configuration and provisions it with necessary software and configurations to run a Kadena's Chainweb Node.
resource "aws_instance" "chainweb-node" {
  ami = "ami-004dac467bb041dc7"
  instance_type = "t2.large" # Equivalent to DigitalOcean's s-8vcpu-16gb Droplet

  associate_public_ip_address = true

  subnet_id = "${aws_subnet.indexer.id}"

  key_name = "${aws_key_pair.opact-ssh.key_name}"

  tags = {
    Name = "chainweb-node"
  }

  vpc_security_group_ids      = ["${aws_security_group.indexer.id}"]

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file(var.pvt_key)
    host        = self.public_ip
  }

  provisioner "file" {
    source = "../indexer/chainweb-node"
    destination = "."
  }

  root_block_device {
    volume_type = "gp2"
    volume_size = 256
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mv chainweb-node/src/cwnode.service /etc/systemd/system/cwnode.service",
      "sudo apt-get update",
      "sudo apt-get remove docker docker-engine docker.io containerd runc",
      "sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "sudo apt-get update",
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io",
      "sudo groupadd docker",
      "sudo usermod -aG docker ubuntu",
      "sudo systemctl enable docker.service",
      "sudo systemctl enable containerd.service",
      "sudo apt-get install -y jq",
      "echo \"DB_SYNC_SERVER=${var.db_sync_server}\" | sudo tee ./chainweb-node/.env",
      "echo \"KADENA_NETWORK=${var.kadena_network}\" | sudo tee -a ./chainweb-node/.env",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable cwnode.service",
      "sudo systemctl start cwnode.service"
    ]
  }
}
