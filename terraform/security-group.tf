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
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

