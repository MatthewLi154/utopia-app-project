# Utopia ![image](https://i.imgur.com/1kY4QtL.png)

***

Utopia is a full stack application clone, inspired by [OkCupid](https://www.okcupid.com/). Utopia is a new dating app for all creatures, races, species, and everything in between. Discover your soulmate through Utopia!

Visit [Utopia](https://aa-utopia.onrender.com/) to create new memories with others! 

***

# Wiki Links

[FEATURE LIST] (https://github.com/MatthewLi154/utopia-app-project/wiki/Feature-List)

Details of specific feature functionality of the application

[DATABASE SCHEMA] (https://github.com/MatthewLi154/utopia-app-project/wiki/Schema)

Overview of the database schema of the application. 

[User Stories] (https://github.com/MatthewLi154/utopia-app-project/wiki/User-Stories)

Details of expected output for each feature as a user. 

## Built With

Frameworks, Platforms and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

HOSTING:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Getting Started

## Instructions on how to run this website locally
-Git Clone Repo

-In the root directory, run the following installs:
```pipenv install pytest
pipenv install pycodestyle
pipenv install pylint
pipenv install rope
pipenv install flask
pipenv install flask-sqlalchemy
pipenv install alembic
pipenv install flask-migrate
pipenv install python-dotenv
pipenv install sqlalchemy
pipenv install wtforms
pipenv install flask-wtf
pipenv install flask-socketio
pipenv install eventlet==0.30.2
```

-In the "react-app" directory, run the following installs:
```
npm install
npm install socket.io-client
```
-Create a .env file in the root of your backend directory to replicate the env.example file. 

-Run the following code in your backend directory: 

```npx dotenv sequelize-cli db:migrate```
```npx dotenv sequelize-cli db:seed:all```

-Run npm start in your backend directory.

-Run npm start in your frontend directory, which will populate a new tab in your browser in localhost:3000, which will allow you to have full access to the website features.

-The website will not function unless BOTH backend and frontend are both running at the same time.
