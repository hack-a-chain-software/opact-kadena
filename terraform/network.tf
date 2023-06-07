# The "aws_vpc", "aws_subnet", "aws_db_subnet_group", "aws_internet_gateway", "aws_route_table",
# "aws_route_table_association", and "aws_network_acl" blocks create and configure a VPC, subnets,
# a database subnet group, an internet gateway, a route table, and a network access control list (ACL) for the VPC.

resource "aws_vpc" "indexer" {
  enable_dns_support = true

  enable_dns_hostnames = true

  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "indexer-vpc"
  }
}

resource "aws_subnet" "indexer" {
  cidr_block = "10.0.1.0/24"

  availability_zone = "us-east-1a"

  vpc_id = "${aws_vpc.indexer.id}"

  map_public_ip_on_launch = true

  tags = {
    Name = "indexer-subnet"
  }
}

resource "aws_subnet" "indexer-b" {
  cidr_block = "10.0.2.0/24"

  availability_zone = "us-east-1b"

  vpc_id = "${aws_vpc.indexer.id}"

  map_public_ip_on_launch = true

  tags = {
    Name = "indexer-subnet-b"
  }
}

resource "aws_db_subnet_group" "indexer" {
  name       = "indexer_subnet_group"

  subnet_ids = [aws_subnet.indexer.id, aws_subnet.indexer-b.id]

  tags = {
    Name = "indexer-subnet-group"
  }
}

resource "aws_internet_gateway" "indexer" {
  vpc_id = "${aws_vpc.indexer.id}"

  tags = {
    Name = "indexer-gateway"
  }
}


resource "aws_route_table" "indexer" {
  vpc_id = "${aws_vpc.indexer.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.indexer.id}"
  }

  tags = {
    Name = "indexer-route-table"
  }
}

resource "aws_route_table_association" "indexer" {
  subnet_id      = "${aws_subnet.indexer.id}"
  route_table_id = "${aws_route_table.indexer.id}"
}

resource "aws_route_table_association" "indexer-b" {
  subnet_id      = "${aws_subnet.indexer-b.id}"
  route_table_id = "${aws_route_table.indexer.id}"
}

resource "aws_network_acl" "indexer" {
  vpc_id     = "${aws_vpc.indexer.id}"
  subnet_ids = "${aws_subnet.indexer.*.id}"

  ingress {
    protocol   = "tcp"
    rule_no    = 101
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 1789
    to_port    = 1789
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 102
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 443
    to_port    = 443
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 103
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 80
    to_port    = 80
  }

  tags = {
    Name = "indexer-network-acl"
  }
}
