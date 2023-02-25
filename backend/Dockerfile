## Build
# docker build -t backend:0.1.0 .
# RUN
# docker run -d -e -p 3800:3800 ORACLE_USER=appuser -e ORACLE_PASS=myapppass -e ORACLE_CONNSTR=localhost:1521/xepdb1 backend:0.1.0

# docker run -d -p 3800:3800 `
# -e ORACLE_USER=appuser `
# -e ORACLE_PASS=myapppass `
# -e ORACLE_CONNSTR=172.17.0.2:1521/xepdb1 `
# backend:0.1.0

# docker run -d -p 3800:3800 \
# -e DB_NAME=XEPDB1
# -e DB_USERNAME=appuser \
# -e DB_PASSWORD=myapppass \
# -e DB_HOST=172.17.0.2:1521 \
# -e SERVER_PORT=3800 \
# -e PRIVATE_KEY=5f840825cc8e271070bc528d2e4a0ad6a46e5efd7f06083b1c9a32aa907771dac10a2d94f845b2d31147c95a7d4e766b 
# backend:0.1.0

FROM oraclelinux:8.7

# Install Oracle Client
# https://yum.oracle.com/oracle-instant-client.html

RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# Install NodeJs
# https://yum.oracle.com/oracle-linux-nodejs.html#InstallingNodeOnOL8
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

# Variables de la app
# ORACLE_USER=oracleuser \
#     ORACLE_PASS=mipass \
#     ORACLE_CONNSTR=localhost:1521/xepdb1 \
#    SERVER_PORT=3800 \

ENV DB_NAME=XEPDB1 \
    DB_USERNAME=appuser \
    DB_PASSWORD=myapppass \
    DB_HOST=localhost \
    DB_PORT=1521 \
    SERVER_PORT=3800 \
    PRIVATE_KEY=5f840825cc8e271070bc528d2e4a0ad6a46e5efd7f06083b1c9a32aa907771dac10a2d94f845b2d31147c95a7d4e766b 

#APP Copy
COPY . /opt/app

# Cambiar de directorio
WORKDIR /opt/app

# Dependencias
RUN npm install

CMD [ "npm", "start" ]