# Spotify Playlist Creator
### Olivia Edell
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

An app to view the currently playing track from your Spotify and add/remove them from playlists. Built with TypeScript and React.

## Project Status
currently in development

## Setup Instructions

Clone this repository, make sure you have `npm` installed

`npm install`

To start server: `npm start`

To see app: `localhost:3000`

## Reflection
### Design and Development Decisions:

The goal of this project was to build an application entirely on the front end to interact with Spotify's web API.

A challenge of this project was building a functional app without a backend/database. The challenges proved to have simple solutions such as using the fetch API and local storage. 

I wanted to keep the application simple in terms of design, mainly to focus on functionality. I decided to use React-Bootstrap for styling since I am very familiar with it. I drew out some wireframes by hand before I began and designed the app based around those. The main page simply shows the current track that is being played, or prompts the user to log in if they have not yet done so. This page was designed to appear similar to the Spotify UI where it shows the current track playing. The Playlist Details page is also designed based on common streaming services' UI. 
I chose to use modals for many of the functions such as adding a playlist, removing a track, or removing a playlist because they are more elegant solutions to confirm quick changes than redirecting to a new page and then back again.
In terms of the code, I started by setting up the file system based on the pages from my wireframes. Then, I worked on getting the API working completely before I started creating the React components for each page and styling them. Now that the app is up and running, I will be working on fixing small bugs and cleaning up the codebase. 


