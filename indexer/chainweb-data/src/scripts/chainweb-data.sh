#!/bin/bash

function node_await() {
 check=$(curl -SsL -k -m 15 https://$CWD_NODE:1789/chainweb/0.0/mainnet01/cut  2>/dev/null | jq .height 2>/dev/null)

 if [ -z "$check" ]; then
   until [ -n "$check" ]; do
     check=$(curl -SsL -k -m 15 https://$CWD_NODE:1789/chainweb/0.0/mainnet01/cut 2>/dev/null | jq .height 2>/dev/null)

     echo -e "Waiting for KDA node..."

     sleep 200
   done
 fi
}

sleep 20

node_await

echo -e "Starting chainweb-data..."

chainweb-data server --port 8888 --service-host=$CWD_NODE --p2p-host=$CWD_NODE --service-port=1848 --p2p-port=1789 --dbuser=$CWD_DB_USER --dbpass=$CWD_DB_PASS --dbname=indexer --dbhost=$CWD_DB_HOST --dbport=$CWD_DB_PORT --ignore-schema-diff
