# This code defines the required provider and backend configurations for a Terraform project.

# The "terraform" block specifies the required providers and the backend configuration.
terraform {
  # The "required_providers" block specifies that the project requires the hashicorp/aws provider.
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # The "backend" block configures the backend to store the Terraform state. In this case, it is configured to use the S3 backend.
  # The "region" parameter specifies the region where the S3 bucket is located.
  backend "s3" {
    region = "us-east-1"
    bucket = "terraform213"
    key = "terraform.tfstate"
    endpoint = "s3.us-east-1.amazonaws.com"
    skip_region_validation  = true
    skip_credentials_validation = true
  }
}
