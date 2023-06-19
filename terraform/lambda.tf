# The "aws_iam_policy_document" block defines an IAM policy that allows describing DB instances on the RDS database.
data "aws_iam_policy_document" "indexer_api_access" {
  statement {
    actions = [
      "rds:DescribeDBInstances",
    ]
    resources = [
      "${aws_db_instance.chainweb_database.arn}"
    ]
  }
}

# The "aws_iam_role" block creates an IAM role that allows Lambda services to assume it.
resource "aws_iam_role" "indexer_api_role" {
  name = "indexer-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
        Sid = ""
      }
    ]
  })
}

# The "aws_iam_role_policy" attaches the IAM policy defined earlier to the IAM role.
resource "aws_iam_role_policy" "indexer_api_role_policy" {
  name = "indexer-api-role-policy"
  role = "${aws_iam_role.indexer_api_role.id}"

  policy = "${data.aws_iam_policy_document.indexer_api_access.json}"
}

# The "aws_lambda_function" block sets up a Lambda function named "indexer-api",
# using a zip file in the specified path as the source code. It uses the Node.js 18.x runtime.
resource "aws_lambda_function" "indexer_api" {
  filename      = "../indexer/api/.serverless/graphql.zip"
  function_name = "indexer-api"
  role          = "${aws_iam_role.indexer_api_role.arn}"
  handler       = "src/server.graphqlHandler"

  source_code_hash = filebase64sha256("../indexer/api/.serverless/graphql.zip")

  runtime = "nodejs18.x"

  environment {
    variables = {
      PG_HOST     = aws_db_instance.chainweb_database.address
      PG_USER     = aws_db_instance.chainweb_database.username
      PG_PASSWORD = aws_db_instance.chainweb_database.password
      PG_DATABASE = aws_db_instance.chainweb_database.db_name
    }
  }
}

# The "aws_lambda_function_url" block creates a URL for testing the latest version of the function.
resource "aws_lambda_function_url" "indexer_api_url" {
  function_name      = aws_lambda_function.indexer_api.function_name
  authorization_type = "NONE"
}
