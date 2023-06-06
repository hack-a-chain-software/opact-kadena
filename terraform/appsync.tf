
# resource "aws_appsync_graphql_api" "indexer" {
#   name   = "example"
#   authentication_type = "AWS_IAM"
#   schema = file("../indexer/chainweb-data/src/schema.graphql")
# }

# resource "aws_appsync_datasource" "indexer" {
#   api_id           = aws_appsync_graphql_api.indexer.id
#   name             = "example"
#   type             = "HTTP"
#   description      = "Example description"

#   relational_database_config {
#     http_endpoint_config: {
#       db_cluster_identifier: ""
#       aws_secret_store_arn: ""
#       database_name: "indexer"
#     }
#   }
# }

# resource "aws_appsync_graphql_api" "people" {
#   name                = "indexer-app-sync"
#   authentication_type = "API_KEY"
# }

# resource "aws_appsync_api_key" "people_api" {
#   api_id  = "${aws_appsync_graphql_api.people.id}"
# }

# resource "aws_iam_role" "api" {
#   name = "foo_datarouce-role"

#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": "sts:AssumeRole",
#       "Principal": {
#         "Service": "appsync.amazonaws.com"
#       },
#       "Effect": "Allow"
#     }
#   ]
# }
# EOF
# }

# resource "aws_iam_role_policy" "api_to_dynamodb_policy" {
#   name = "foo_datarouce_api_dynamodb_policy"
#   role = "${aws_iam_role.api.id}"

#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Action": [
#         "dynamodb:PutItem",
#         "dynamodb:Scan"
#       ],
#       "Effect": "Allow",
#       "Resource": [
#         "${aws_db_instance.chainweb_database.arn}"
#       ]
#     }
#   ]
# }
# EOF
# }

# resource "aws_secretsmanager_secret" "db_credentials" {
#   name = "db_credentials"
# }

# resource "aws_secretsmanager_secret_version" "db_credentials" {
#   secret_id     = aws_secretsmanager_secret.db_credentials.id
#   secret_string = jsonencode({
#     username = "doadmin"
#     password = "5FHSFSip"
#   })
# }

# resource "aws_appsync_datasource" "people" {
#   api_id           = "${aws_appsync_graphql_api.people.id}"
#   name             = "foo_datarouce"
#   service_role_arn = "${aws_iam_role.api.arn}"
#   type             = "RELATIONAL_DATABASE"

#   relational_database_config {
#     http_endpoint_config {
#       db_cluster_identifier = "${aws_db_instance.chainweb_database.arn}"
#       aws_secret_store_arn = "${aws_secretsmanager_secret.db_credentials.arn}"
#     }
#   }
# }
