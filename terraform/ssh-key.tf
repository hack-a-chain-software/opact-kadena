# Define ssh to config in instance

# Create default ssh publique key
resource "aws_key_pair" "opact-ssh" {
  key_name   = "opact-ssh"
  public_key = file(var.pub_key)
}
