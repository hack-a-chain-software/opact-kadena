#!/bin/bash
GATEWAYIP=$(hostname -i | sed 's/\.[^.]*$/.1/')

if [[ ! -f /tmp/backfill ]]; then
    echo -e "Fill not complited...skipped..."
fi

date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo -e "Fill was started at $date_timestamp" >> /tmp/fill_history.log
/usr/local/bin/chainweb-data fill --service-host=44.221.155.251 --p2p-host=44.221.155.251 --service-port=1848 --p2p-port=1789 --dbuser=doadmin --dbpass=5FHSFSip --dbname=indexer --dbhost="chainweb-database.cy3zz0ima9l1.us-east-1.rds.amazonaws.com" --ignore-schema-diff --dbport=5432
date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo -e "Fill was ended at $date_timestamp" >> /tmp/fill_history.log
