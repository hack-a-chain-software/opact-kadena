# The "aws_db_instance" resource block describes an Amazon RDS database instance named "chainweb-database" that runs PostgreSQL version 14.6. It is a t3.medium instance class, with a username and password set via variables. It has a 25GB gp2 storage volume and is not configured for multi-AZ deployment. It's associated with a security group and a subnet group.
resource "aws_db_instance" "chainweb_database" {
  identifier        = "chainweb-database"
  engine            = "postgres"
  db_name        = "indexer"
  engine_version    = "14.6"
  instance_class    = "db.t3.medium"
  username          = var.db_username
  password          = var.db_password
  publicly_accessible = true
  skip_final_snapshot = true
  allocated_storage    = 25
  storage_type         = "gp2"
  multi_az             = false

  vpc_security_group_ids = ["${aws_security_group.indexer.id}"]

  db_subnet_group_name = "${aws_db_subnet_group.indexer.name}"

  tags = {
    Name = "indexer-db-instance-chainweb-database"
  }
}

# The "null_resource" block is used to run an arbitrary local command that does not create any infrastructure resources. In this case, it is used to initialize a database by executing an SQL file located at the specified path.
resource "null_resource" "init_db" {
  triggers = {
    schema_file = filebase64sha256(
      "../indexer/chainweb-data/src/init.sql"
    )
  }

  provisioner "local-exec" {
    command = <<EOF
      export PGPASSWORD=${aws_db_instance.chainweb_database.password}

      psql -h ${aws_db_instance.chainweb_database.address} -U ${aws_db_instance.chainweb_database.username} -d ${aws_db_instance.chainweb_database.db_name} -p 5432 -f ../indexer/chainweb-data/src/init.sql
    EOF
  }
}
