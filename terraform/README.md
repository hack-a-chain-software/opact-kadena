# Terraform

This repository contains Terraform code for deploying infrastructure on DigitalOcean.

The code provisions resources such as Droplets, SSH keys, and a database cluster. The infrastructure is designed to support the deployment of a Chainweb node and data components.

## Prerequisites

Before running this Terraform code, make sure you have the following prerequisites set up:

- Terraform: Install Terraform on your local machine. You can download it from the official website: [Terraform Downloads](https://developer.hashicorp.com/terraform/downloads).

- DigitalOcean Account: Create an account on [DigitalOcean](https://www.digitalocean.com/). You will need an API token for authentication, which you can obtain from the DigitalOcean control panel.

- SSH Key Pair: Generate an SSH key pair if you don't have one already. The private key will be used for authentication to the Droplets.

## Usage

Follow the steps below to use this Terraform code:

- Clone the repository: Clone this repository to your local machine.

- Set up Terraform variables: Create a file named .tfvars in the root directory as the Terraform code. Add the following content to the file and replace the placeholder values with your own:
```
do_token = "YOUR_DIGITALOCEAN_API_TOKEN"
project_id = "YOUR_DIGITALOCEAN_PROJECT_ID"
pvt_key = "/path/to/your/private/ssh/key"
pub_key = "/path/to/your/public/ssh/key"
db_sync_server = "KADENA_CHAINWEB_NODE_HOST"
kadena_network = "KADENA_NETWORK"
```

- Initialize Terraform: Open a terminal or command prompt, navigate to the cloned repository directory, and run the following command to initialize Terraform:

```
pnpm terraform install
```

- Review the execution plan: Run the following command to see the execution plan and ensure that everything looks correct:

```
pnpm terraform plan
```
Verify that the planned changes match your expectations.

- Apply the Terraform configuration: Once you're ready to provision the infrastructure, run the following command:

```
pnpm terraform apply
```

- Wait for the deployment: Terraform will start provisioning the resources on DigitalOcean. Wait for the process to complete.

- Access the deployed infrastructure: After the deployment is successful, you can access the deployed resources, such as the Droplets, using SSH. Make sure to use the appropriate SSH key and the IP addresses of the created Droplets.

- Cleanup and destroy: To clean up and destroy the created infrastructure, run the following command:

```
pnpm terraform destroy
```

## Additional Information

- The Terraform code uses the DigitalOcean provider, which is defined in the *required_providers* block in the *terraform* configuration section.

- The SSH key paths and DigitalOcean API token are defined as variables in the *variable* blocks. You can customize these values in the *variables.tf* file or by using command-line flags when executing Terraform commands.

- The code provisions a DigitalOcean SSH key named *opact-ssh* using the public key located at the path specified in the *pub_key* variable. Make sure the file exists and contains the correct public key.

- The code creates a DigitalOcean database cluster named "cwd-database" using PostgreSQL version 15. Adjust the cluster configuration as needed by modifying the *resource "digitalocean_database_cluster" "cwd-database"* block.

- The Droplets are provisioned using the Ubuntu 22.04 x64 image in the "nyc1" region. Adjust the image, region, size, and other configurations in the *resource "digitalocean_droplet" "chainweb-data"* and *resource "digitalocean_droplet" "chainweb-node"* blocks to fit your requirements.
