import React, { useState, useEffect } from 'react';
import { updateLanguageServiceSourceFile } from 'typescript';
import './App.css';



import Login from './pages/LoginPage'
import CurrentSong from './pages/CurrentSongPage'
import Playlists from './pages/PlaylistsPage'
import PlaylistDetails from './pages/PlaylistDetailsPage'


type AppProps = {
  path:string,
  userLoggedIn:boolean //TODO useState to set userLoggedIn
}



const Page = ({path, userLoggedIn} : AppProps) => {
switch(path) {
  case 'login':
    return <Login />
     
  case 'current-song':
    return <CurrentSong />

  case 'playlists':
    return <Playlists />
  
  case 'playlist-details':
    return <PlaylistDetails />

  default:
    return (
      userLoggedIn ? <CurrentSong /> : <Login />
    )


}
  
}
function App() {

 
 
  return (
    <div className="App">
      <Page path = {window.location.pathname.split('/')[1]} userLoggedIn = {true}/>
    </div>
  )




}

export default App;
