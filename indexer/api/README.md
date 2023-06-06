# NodeJS + AWS Lambda + Apollo Server + Sequelize

This is a GraphQL backend boilerplate in nodeJS that can be deployed on AWS Lambda.

## Stack

node 8.10

AWS RDS Postgres

AWS Lambda

#### Frameworks/Libraries

Apollo Server (GraphQL framework)

Sequelize (Postgres ORM)

## Schema

We consider a bank account schema where a user can transfer money to another user. This will involve writing a `transfer` resolver which does complex business logic in a transaction.

```
type User {
  id:       Int
  name:     String
  balance:  Int
}

type Query {
  hello:  String
  users:  [User]
}

type Mutation {
  addUser(name: String, balance: Int): User
  transfer(userIdFrom: Int, userIdTo: Int, amount: Int): User
}
```

## Development

The sample source code is present in `graphql.js`. Clone the repo and go to `aws-nodejs/apollo-sequelize` folder:

```bash
$ git clone git@github.com:hasura/graphql-serverless
$ cd graphql-serverless/aws-nodejs/apollo-sequelize
```

1) First, let's set the environment variable for connecting to the postgres instance on RDS. You can find this endpoint on your RDS instances page on AWS console:

```bash
$ export POSTGRES_CONNECTION_STRING='postgres://username:password@rds-database-endpoint.us-east-1.rds.amazonaws.com:5432/mydb' 
```

2) Next, lets create the tables required for our schema. The SQL commands are in `migrations.sql` file.

```bash
$ psql $POSTGRES_CONNECTION_STRING < ../../schema/migrations.sql
```

3) Now, you can start a development environment by setting an environment variable before running the code:

```bash
$ export LAMBDA_LOCAL_DEVELOPMENT=1
```

4) Now, you can run the code:

```bash
$ node graphql.js

Output:

Server ready at http://localhost:4000/
```

This will start a local server on `localhost:4000`. You can hit the graphql service at `localhost:4000`. This opens a graphql playground where you can query your schema.

Now, you can play with the schema and make any changes in the source code for additional functionalities as you desire.

## Deployment

Now that you have run the graphql service locally and made any required changes, it's time to deploy your service to AWS Lambda and get an endpoint. The easiest way to do this is through the AWS console.

1) Create a Lambda function by clicking on Create Function on your Lambda console. Choose the `NodeJS 8.10` runtime and `lambda_basic_execution` role.

![create-lambda](../../_assets/create-lambda.png)

2) In the next page (or Lambda instance page), select API Gateway as the trigger.

![create-api-gateway](../../_assets/create-api-gateway.png)

3) Configure the API Gateway as you wish. The simplest configuration is shown below.

![configure-api-gateway](../../_assets/configure-api-gateway.png)

Save your changes. You will receive a HTTPS endpoint for your lambda.

![output-api-gateway](../../_assets/output-api-gateway.png)

If you go to the endpoint, you will receive a "Hello from Lambda!" message. This is because we haven't uploaded any code yet!

4) Zip and upload code. Make sure to set the handler as `graphql.handler` and add the `POSTGRES_CONNECTION_STRING` environment variable:

```bash
$ zip -r graphql.zip *
```

![upload-code](../../_assets/upload-code.png)

And that's it. Hit save and visit the endpoint again. You will see the graphql playground again.

**IMPORTANT NOTE:** You may have to edit the GraphQL URL in the Playground to reflect the right endpoint ( same as the URL created by the API Gateway ). 

## Connection Pooling

As discussed in the main [readme](../../README.md), without connection pooling our GraphQL backend will not scale at the same rate as serverless invocations. With Postgres, we can add a standalone connection pooler like [pgBouncer](https://pgbouncer.github.io/) to accomplish this. 

Deploying pgBouncer requires an EC2 instance. We can use the CloudFormation template present in this folder: [cloudformation.json](../../cloudformation/cloudformation.json) to deploy a pgBouncer EC2 instance in few clicks.

#### Deploy pgBouncer

1. Goto CloudFormation in AWS Console and select Create Stack.

2. Upload the file [cloudformation.json](../../cloudformation/cloudformation.json) as the template.

3. In the next step, fill in your Postgres connection details:

![cloudformation-params](../../_assets/cloudformation-params.png)

4. You do not need any other configuration, so just continue by clicking NEXT and finally click CREATE.

5. After the creation is complete, you will see your new `POSTGRES_CONNECTION_STRING` in the output:

![cloudformation-output](../../_assets/cloudformation-output.png)

Now, change your `POSTGRES_CONNECTION_STRING` in your lambda function to the new value. And, everything should just work!

#### Results

Using pgBouncer, here are the results for corresponding rate of lambda invocations. The tests were conducted with the `addAuthor` mutation using [jmeter](https://jmeter.apache.org/).

|  Error Rate -> | Without pgBouncer | With pgBouncer|
| -------------- | ----------------- | ------------- |
| 100 req/s      | 86%               | 0%            |
| 1000 req/s     | 92%               | 4%            |
| 10000 req/s    | NA                | 3%            |

