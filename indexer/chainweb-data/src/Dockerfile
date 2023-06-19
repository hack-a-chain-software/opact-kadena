ARG UBUNTUVER=22.04
FROM ubuntu:${UBUNTUVER}

RUN apt-get update -y && apt-get upgrade -y \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y wget curl unzip dirmngr gnupg git cron lsof jq supervisor lsb-release \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/postgresql-archive-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list \
 && mkdir -p /usr/share/keyrings \
 && mkdir -p /.gnupg \
 && gpg --homedir /.gnupg --no-default-keyring --keyring /usr/share/keyrings/postgresql-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 7FCC7D46ACCC4CF8

RUN set -eux; \
	groupadd -r postgres --gid=999; \
	useradd -r -g postgres --uid=999 --home-dir=/var/lib/postgresql --shell=/bin/bash postgres; \
	mkdir -p /var/lib/postgresql; \
	chown -R postgres:postgres /var/lib/postgresql

ENV PG_VERSION=15 \
    FONTCONFIG_FILE=/etc/fonts/fonts.conf \
    LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    LC_CTYPE=en_US.UTF-8 \
    LOCALE_ARCHIVE=/usr/lib/locale/locale-archive \
    UBUNTUVER=22.04

RUN apt-get update -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y locales postgresql-${PG_VERSION} postgresql-client-${PG_VERSION} postgresql-contrib-${PG_VERSION} \
    && update-locale LANG=C.UTF-8 LC_MESSAGES=POSIX \
    && locale-gen en_US.UTF-8 \
    && DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales \
    && rm -rf /var/lib/apt/lists/*

WORKDIR "/usr/local/bin"

RUN PACKAGE=$(curl --silent "https://api.github.com/repos/kadena-io/chainweb-data/releases/latest" | jq -r .assets[].browser_download_url | grep ${UBUNTUVER} ) \
    && echo "Downloading file: ${PACKAGE}" \
    && wget "${PACKAGE}" \
    && unzip * \
    && rm -rf *.zip \
    && chmod +x chainweb-data

RUN mkdir -p /var/log/supervisor

COPY ./src/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./src/scripts/chainweb-data.sh /chainweb-data.sh
COPY ./src/scripts/backfill.sh /backfill.sh
COPY ./src/scripts/check-health.sh /check-health.sh

RUN chmod 755 /backfill.sh
RUN chmod 755 /chainweb-data.sh
RUN chmod 755 /check-health.sh

# HEALTHCHECK --start-period=10m --interval=1m --retries=5 --timeout=20s CMD /check-health.sh

ENTRYPOINT ["/usr/bin/supervisord"]
