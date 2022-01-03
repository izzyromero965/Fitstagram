# Welcome to Fitstagram!!

[Fitstagram](https://fitstagramir.herokuapp.com/) is an [Instagram](https://www.instagram.com/) clone made for people who are dedicated to sports. Ever get tired of seeing random things that you don't care for? Fitstagram is here to help you find motivation. Fitstagram has full C/R/U/D functionality for following a person, creating a user, posting images and commenting on others posts! You can also search for users in case you need help remembering what the full username was that you were looking for. You can find the features list [here](https://github.com/snakedreamz/Fitstagram/wiki/Feature-List).


You can find the database schema [here](https://github.com/snakedreamz/Fitstagram/wiki/Database-Schema).

## Tech Stack
 
 
 ### [Front-End]:
 * ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
 * ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 * ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
 * ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
 * ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
 * ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
 * ![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

 ### [Back-end]:
 * ![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
 * ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
 * ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
 * ![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
 * SQL Alchemy/Alembic
 * WTForms
 * Docker


## Future Features for Benkyou

* DM'ing other users.
* Posting your workouts for sale
* Live streaming and commenting on live streams
* Stories
* Recommended users


## Want to contribute to Fitstagram or try it locally?

1. clone the repo with the command ```https://github.com/snakedreamz/Fitstagram.git```
2. cd into the newly created project directory and install the backend dependencies with: `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. create a .env file based on the example .env file in the root direcotry with the proper settings for your development environment
4. setup your PostgresSQL user and database, matching the .env file you just created 
5. enter the pipenv shell: `pipenv shell`
6. migrate the datbase: `flask db upgrade`
7. seed the database: `flask seed all` 
8. start the backend server: `flask run`
9. open another terminal for the front-end server, cd into the '/react-app' directory
10. install the front-end dependencies: `npm install`
11. start the front-end server: `npm start`
