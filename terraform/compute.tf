# This resource block is creating an Elastic IP (EIP) in AWS and associating it with the EC2 chainweb-node instance. An EIP is an AWS public static IPv4 address that you can allocate to your AWS account. You can attach an EIP to any instance or network interface for Internet connectivity.
resource "aws_eip" "chainweb_node_ip" {
  instance = aws_instance.chainweb_node.id
}

# This resource block creates an EC2 instance on AWS with a specified AMI (Amazon Machine Image) and an instance type of t2.micro. This instance is configured to associate a public IP address and launch within a specific subnet within the VPC. The instance is tagged with the name chainweb-data and the security configuration is defined through a specific security group. Additionally, the instance is provisioned with Docker and other settings related to chainweb-data.
resource "aws_instance" "chainweb_data" {
  instance_type = "t2.micro"

  ami = "ami-053b0d53c279acc90"

  associate_public_ip_address = true

  subnet_id = "${aws_subnet.indexer.id}"

  key_name = "${aws_key_pair.opact-ssh.key_name}"

  tags = {
    Name = "chainweb-data"
  }

  depends_on = [
    null_resource.init_db,
    aws_instance.chainweb_node,
  ]

  vpc_security_group_ids = ["${aws_security_group.indexer.id}"]

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
resource "aws_instance" "chainweb_node" {
  ami = "ami-053b0d53c279acc90"

  instance_type = "t3.xlarge"

  associate_public_ip_address = true

  subnet_id = "${aws_subnet.indexer.id}"

  key_name = "${aws_key_pair.opact-ssh.key_name}"

  tags = {
    Name = "chainweb-node"
  }

  vpc_security_group_ids = ["${aws_security_group.indexer.id}"]

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
    volume_size = 420
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
      "cd chainweb-node",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable cwnode.service",
      "sudo systemctl start cwnode.service"
    ]
  }
}
