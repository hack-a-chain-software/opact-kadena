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
  description = "AWS access key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "db_username" {
  description = "DB username"
  type        = string
  default     = "doadmin"
}

variable "db_password" {
  description = "DB password"
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
  default     = "testnet04"
}
