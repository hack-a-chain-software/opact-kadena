# The "aws" provider block establishes the connection with AWS. It specifies the region, access key, and secret key to authenticate and connect with AWS.
provider "aws" {
  region = "${var.aws_region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}
