# The resource "digitalocean_database_cluster" represents the configuration for the database cluster named "chainweb-database".
# The cluster is set up with PostgreSQL as the engine, version 15. The cluster is associated with the project specified by the variable "project_id".
resource "aws_db_instance" "chainweb_database" {
  identifier        = "chainweb-database"
  engine            = "postgres"
  name        = "indexer"
  engine_version    = "14.6"
  instance_class    = "db.t3.medium"
  username          = var.db_username
  password          = var.db_password
  publicly_accessible = true
  skip_final_snapshot = true
  allocated_storage    = 20
  storage_type         = "gp2"
  multi_az             = false

  vpc_security_group_ids = ["${aws_security_group.indexer.id}"]

  db_subnet_group_name = "${aws_db_subnet_group.indexer.name}"

  tags = {
    Name = "indexer-db-instance-chainweb-database"
  }
}

# The "null_resource" resource block represents a resource that doesn't create any infrastructure itself but can be used to trigger actions or perform local operations.
# In this case, it is used to initialize a database
resource "null_resource" "init_db" {
  triggers = {
    schema_file = filebase64sha256(
      "../indexer/chainweb-data/src/init.sql"
    )
  }

  provisioner "local-exec" {
    command = <<EOF
      export PGPASSWORD=${aws_db_instance.chainweb_database.password}

      psql -h ${aws_db_instance.chainweb_database.address} -U ${aws_db_instance.chainweb_database.username} -d ${aws_db_instance.chainweb_database.name} -p 5432 -f ../indexer/chainweb-data/src/init.sql
    EOF
  }
}
