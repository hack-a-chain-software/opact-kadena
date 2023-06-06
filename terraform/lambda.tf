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

resource "aws_iam_role" "indexer_api_role" {
  name = "lambda_role"

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

resource "aws_iam_role_policy" "indexer_api_role_policy" {
  name = "lambda_role_policy"
  role = "${aws_iam_role.indexer_api_role.id}"

  policy = "${data.aws_iam_policy_document.indexer_api_access.json}"
}

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

resource "aws_lambda_function_url" "test_latest" {
  function_name      = aws_lambda_function.indexer_api.function_name
  authorization_type = "NONE"
}
