variable "pvt_key" {
  description = "Path for SSH"
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "pub_key" {
  description = "Path for Pub SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "aws_access_key" {
  description = "Digital Ocean API token"
  type        = string
}
variable "aws_secret_key" {
  description = "Digital Ocean API token"
  type        = string
}
variable "aws_region" {
  description = "Digital Ocean API token"
  type        = string
}
variable "db_username" {
  description = "Digital Ocean API token"
  type        = string
}
variable "db_password" {
  description = "Digital Ocean API token"
  type        = string
}

variable "db_sync_server" {
  description = "Kadena chainweb-node host"
  type        = string
  default     = "us-e1.chainweb.com"
}

variable "kadena_network" {
  description = "Kadena network"
  type        = string
  default     = "mainnet01"
}
