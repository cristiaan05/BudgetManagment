# BudgetManagment
The project consists of making a web application for budget management.

//RUN THE DOCKER DATABASE
docker run -d -p 1525:1521 \
-e ORACLE_PASSWORD=mypass \
-e APP_USER=appuser \
-e APP_USER_PASSWORD=myapppass \
-v $pwd\:/container-entrypoint-initdb.d \
-v oradata:/opt/oracle/oradata \
gvenzl/oracle-xe:21.3.0


//RUN THE DOCKER BACKEND
docker run -d -p 3800:3800 \
-e DB_NAME=XEPDB1 \
-e DB_USERNAME=appuser \
-e DB_PASSWORD=myapppass \
-e DB_HOST=172.17.0.2 \
-e DB_PORT=1521 \
-e SERVER_PORT=3800 \
-e PRIVATE_KEY=5f840825cc8e271070bc528d2e4a0ad6a46e5efd7f06083b1c9a32aa907771dac10a2d94f845b2d31147c95a7d4e766b \
backend:0.1.0

docker exec -it 7b23103c70b3 /bin/bash
sqlplus sys/mypass@XEPDB1 as sysdba
