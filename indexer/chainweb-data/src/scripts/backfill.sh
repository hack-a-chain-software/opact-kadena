#!/bin/bash
check=$(curl -SsL -k -m 15 https://44.221.155.251:1789/chainweb/0.0/testnet04/cut  2>/dev/null | jq .height 2>/dev/null)

if [ -z "$check" ]; then
until [ -n "$check" ]; do
    check=$(curl -SsL -k -m 15 https://44.221.155.251:1789/chainweb/0.0/testnet04/cut 2>/dev/null | jq .height 2>/dev/null)

    echo -e "Waiting for KDA node..."

    sleep 300
done
fi

if [[ -f /tmp/backfill ]]; then
    echo -e "Running fill as gaps..."
    chainweb-data fill --service-host=44.221.155.251 --p2p-host=44.221.155.251 --service-port=1848 --p2p-port=1789 --dbuser=$CWD_DB_USER --dbpass=$CWD_DB_PASS --dbname=indexer --dbhost=$CWD_DB_HOST --dbport=$CWD_DB_PORT --ignore-schema-diff
    exit
fi

x=0
backfill_count=0

until [[ "$x" == 1 ]] ; do
   # give time postgres to run
  if [[ "$backfill_count" == 0 ]]; then
    echo "Initial waiting to receive a block on each chain..."
    sleep 120
  else
    sleep 60
  fi

  server_check=$(ps aux | grep idle | wc -l)

  if [[ "$server_check" == 1 ]]; then

    date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo -e "Fill started at $date_timestamp"
    chainweb-data fill --service-host=44.221.155.251 --p2p-host=44.221.155.251 --service-port=1848 --p2p-port=1789 --dbuser=$CWD_DB_USER --dbpass=$CWD_DB_PASS --dbname=indexer --dbhost=$CWD_DB_HOST --dbport=$CWD_DB_PORT --ignore-schema-diff +RTS -N

    sleep 10

    progress_check=$(cat $(ls /var/log/supervisor | grep chainweb-backfill-stdout | awk {'print "/var/log/supervisor/"$1'} ) | tail -n1 | egrep 'Progress' | egrep -o -E '[0-9]+\.[0-9]+' | egrep -o -E '[0-9]+' | head -n1 )

    date_timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    backfill_count=$((backfill_count+1))
     if [[ "$progress_check" != "" ]]; then
      echo -e "Fill progress: $progress_check %, stopped at $date_timestamp, counter: $backfill_count"
     else
      echo -e "Fill stopped at $date_timestamp, counter: $backfill_count"
     fi

     if [[ "$progress_check" -ge 99 ]]; then
       x=1

       echo -e "Fill Complited!" >> /tmp/backfill

       if [[ ! -f /tmp/crone ]]; then
         sleep 120

         echo -e "Added crone job for fill as gaps..."

         (crontab -l -u "$USER" 2>/dev/null; echo "*/10 * * * *  /bin/bash /gaps.sh > /tmp/fill_output.log 2>&1") | crontab -

         echo -e "Cron job added!" >> /tmp/crone
       else
         echo -e "Cron job already exist..."
       fi
       exit
     fi

     if [[ "$progress_check" == "" && "$backfill_count" == 2 ]] ; then
        x=1

        echo -e "Fill Complited!" >> /tmp/backfill

        if [[ ! -f /tmp/crone ]]; then
          sleep 120

          echo -e "Added crone job for fill as gaps..."

          (crontab -l -u "$USER" 2>/dev/null; echo "*/10 * * * *  /bin/bash /gaps.sh > /tmp/fill_output.log 2>&1") | crontab -

          echo -e "Crone job added!" >> /tmp/crone
         else
          echo -e "Crone job already exist..."
        fi
        exit
      fi
  fi
done
