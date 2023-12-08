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

variable "do_token" {
  description = "Digital Ocean API token"
  type        = string
}

variable "project_id" {
  description = "Digital Ocean Project"
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
