# Security group configuration

# The "aws_security_group" block defines a security group that allows incoming traffic on specific ports and enables SSH connections.
# The security group also allows all outbound traffic.
resource "aws_security_group" "indexer" {
  name        = "indexer-security-group"

  description = "Allow indexer incgress trafic"

  vpc_id      = "${aws_vpc.indexer.id}"

  tags = {
    Name = "indexer-security-group"
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

