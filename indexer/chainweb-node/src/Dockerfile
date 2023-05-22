FROM ghcr.io/kadena-io/chainweb-node/ubuntu:latest

RUN apt-get update && apt-get install -y docker.io

COPY ./src/scripts/validatedb.sh /app/validatedb.sh

RUN chmod +x /app/validatedb.sh

ENTRYPOINT ["/app/validatedb.sh"]
