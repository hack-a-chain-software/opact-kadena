resource "aws_iam_user" "read_write_user" {
  name = "read-write-user"
}

resource "aws_iam_access_key" "read_write_user_key" {
  user    = aws_iam_user.read_write_user.name
}

resource "aws_iam_policy" "read_write_policy" {
  name        = "read-write-policy"
  description = "Permite leitura e escrita em recursos específicos"
policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:Describe*",
        "rds:List*",
        "rds:Modify*",
        "rds:Create*",
        "rds:Delete*"
      ],
      "Resource": "arn:aws:rds:*:*:cluster:${aws_db_instance.chainweb_database.identifier}"
    }
  ]
}
EOF
}

resource "aws_iam_user_policy_attachment" "read_write_user_attachment" {
  user       = aws_iam_user.read_write_user.name
  policy_arn = aws_iam_policy.read_write_policy.arn
}

# Criação de um usuário com permissões somente de leitura
resource "aws_iam_user" "read_only_user" {
  name = "read-only-user"
}

resource "aws_iam_access_key" "read_only_user_key" {
  user    = aws_iam_user.read_only_user.name
}

resource "aws_iam_policy" "read_only_policy" {
  name        = "read-only-policy"
  description = "Permite apenas leitura em recursos específicos"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:Describe*",
        "rds:List*"
      ],
      "Resource": "arn:aws:rds:*:*:cluster:${aws_db_instance.chainweb_database.identifier}"
    }
  ]
}
EOF
}

resource "aws_iam_user_policy_attachment" "read_only_user_attachment" {
  user       = aws_iam_user.read_only_user.name
  policy_arn = aws_iam_policy.read_only_policy.arn
}
