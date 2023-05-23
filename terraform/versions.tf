terraform {
  # The "required_providers" block specifies that the project requires the DigitalOcean provider.
  # It sets the source to "digitalocean/digitalocean" and specifies that any version in the "~> 2.0" range is acceptable.
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  # The "backend" block configures the backend to store the Terraform state. In this case, it is configured to use the S3 backend. The "region" parameter specifies the region where the S3 bucket is located.
  backend "s3" {
    region = "us-west-1"
    bucket = "kadena-s3"
    key = "terraform.tfstate"
    endpoint = "https://nyc3.digitaloceanspaces.com"
    skip_metadata_api_check = true
    skip_credentials_validation = true
  }
}
