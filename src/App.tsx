import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./pages/LoginPage"
import CurrentSong from "./pages/CurrentSongPage"
import Playlists from "./pages/PlaylistsPage"
import PlaylistDetails from "./pages/PlaylistDetailsPage"
import Navi from "./components/Navi"

import "./App.css"

type AppProps = {
  path: string
  queryString: string
  userLoggedIn: boolean //TODO useState to set userLoggedIn
}

const Page = ({ path, queryString, userLoggedIn }: AppProps) => {
  const id_num: number = parseInt(queryString.split("=")[1])

  switch (path) {
    case "login":
      return <Login />

    case "current-song":
      return <CurrentSong />

    case "playlists":
      return <Playlists />

    case "playlist-details":
      return <PlaylistDetails playlistIndex={id_num} />

    default:
      return userLoggedIn ? <CurrentSong /> : <Login />
  }
}
function App() {
  const [path, setPath] = useState<string>()
  const [queryString, setQueryString] = useState<string>()

  useEffect(() => {
    setPath(window.location.pathname.split("/")[1])
    setQueryString(window.location.href.split("?")[1])
  }, [])
  return (
    <div className="App">
      <Navi />
      <Page
        path={path ? path : ""}
        queryString={queryString ? queryString : ""}
        userLoggedIn={true}
      />
    </div>
  )
}

export default App
