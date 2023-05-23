terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    region = "us-west-1"
    bucket = "kadena-s3"
    key = "terraform.tfstate"
    endpoint = "https://nyc3.digitaloceanspaces.com"
    skip_metadata_api_check = true
    skip_credentials_validation = true
  }
}
