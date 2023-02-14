
  
 <p align="center">


<br />
<div align="center">

![Screenshot 2023-02-10 at 1 44 58 PM](https://user-images.githubusercontent.com/63214473/218629468-80c27743-ca1d-46ca-98e8-88ab132478a9.png)


HackPitch

Spotify clone allows users to create, edit, delete playlists and leave reviews for albums. Built with React, Redux, Material-UI, AWS, Flask, and SQLAlchemy. Users can also upload a photo to personalize playlists, browse and read reviews left by other users for albums. App utilizes AWS and SQLAlchemy for backend, React and Material-UI for frontend. Gives music lovers the ability to fully customize their listening experience and get insights from other users.
    <br />
    <br />
    <a href="https://spotify-aa-clone.onrender.com/dashboard"> Live Link </a>
    |
     <a href="https://github.com/Micodlr/Spotify-Clone/wiki/Features">Features</a>
    |
    <a href="https://github.com/Micodlr/Spotify-Clone/wiki/Database-Schema">Database Schema</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Preview</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

## Preview

Dashboard
<img width="1493" alt="Screenshot 2023-02-13 at 7 13 57 PM" src="https://user-images.githubusercontent.com/63214473/218630244-cb4d0188-a218-436a-9386-8c62c6b1a4f6.png">


List of all songs page
<img width="1491" alt="Screenshot 2023-02-13 at 7 14 10 PM" src="https://user-images.githubusercontent.com/63214473/218630347-06892b46-3b7d-4736-adbe-3155218e359f.png">

List of all artists
<img width="1487" alt="Screenshot 2023-02-13 at 7 20 43 PM" src="https://user-images.githubusercontent.com/63214473/218630772-87eb9a37-d524-4141-a53f-3a800aa802fb.png">

Album reviews
<img width="1478" alt="Screenshot 2023-02-13 at 7 19 08 PM" src="https://user-images.githubusercontent.com/63214473/218630862-ba25dd54-3f5f-44c0-bb5d-7c9e9ec80a69.png">

### Built With

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge&logoWidth=30)
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge&logoWidth=30)
![Python](https://img.shields.io/badge/-Python-366D9C?logo=Python&logoColor=white&style=for-the-badge&logoWidth=30)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge&logoWidth=30)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge&logoWidth=30)
![Flask](https://img.shields.io/badge/-Flask-020202?logo=flask&logoColor=white&style=for-the-badge&logoWidth=30)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge&logoWidth=30)
![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge&logoWidth=30)
![SQLITE](https://img.shields.io/badge/-Sqlite-003B57?logo=sqlite&logoColor=white&style=for-the-badge&logoWidth=30)
![Render](https://img.shields.io/badge/-Render-4351E8?logo=Render&logoColor=white&style=for-the-badge&logoWidth=30)
![NPM](https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge&logoWidth=30)
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=for-the-badge&logoWidth=30)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=for-the-badge&logoWidth=30)


# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

