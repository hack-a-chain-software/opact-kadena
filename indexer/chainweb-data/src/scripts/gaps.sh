#!/bin/bash
GATEWAYIP=$(hostname -i | sed 's/\.[^.]*$/.1/')

if [[ ! -f /tmp/backfill ]]; then
    echo -e "Fill not complited...skipped..."
fi

echo -e "FUCKING BACKFILL HERES"
echo -e "${CWD_NODE}-${CWD_DB_HOST}-${CWD_DB_USER}"
echo -e $CWD_NODE
echo -e "FUCKING BACKFILL HERES"

date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo -e "Fill was started at $date_timestamp" >> /tmp/fill_history.log
/usr/local/bin/chainweb-data fill --service-host=64.227.5.244 --p2p-host=64.227.5.244 --service-port=1848 --p2p-port=1789 --dbuser=doadmin --dbpass=AVNS_awX1Ry5fhwR9xKRQSN2 --dbname=indexer --dbhost="chainweb-data-db-prod-do-user-13083855-0.b.db.ondigitalocean.com" --dbport=25060
date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo -e "Fill was ended at $date_timestamp" >> /tmp/fill_history.log
