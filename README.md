# bstformbackend

1. Download and Install MySql - https://dev.mysql.com/downloads/mysql/
2. Open MySql.
3. Make sure you are in the bstformbackend directory, from the terminal run npm install.
4. run: makemigration --name initial_migration
5. run: sequelize db:create
6. run: sequelize db:migrate (Database should now be set up & running)
7. run: nodemon (to start the server) - # Server on localhost:3001
8. Now that the server is running you can open the frontend and follow the instructions at: https://github.com/KevinFrohlich/bstformfrontend
