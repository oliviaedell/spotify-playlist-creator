import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Login from "./pages/LoginPage"
import CurrentSong from "./pages/CurrentSongPage"
import Playlists from "./pages/PlaylistsPage"
import PlaylistDetails from "./pages/PlaylistDetailsPage"
import { useEffect, useState } from "react"

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
      return <PlaylistDetails playlist_id={id_num} />

    default:
      return userLoggedIn ? <CurrentSong /> : <Login />
  }
}
function App() {
  const [path, setPath] = useState<string>()
  const [queryString, setQueryString] = useState<string>()

  useEffect(() => {
    setPath(window.location.pathname.split("/")[1].split("?")[0])
    setQueryString(window.location.href.split("?")[1])
  }, [])
  return (
    <div className="App">
      <Page
        path={path ? path : ""}
        queryString={queryString ? queryString : ""}
        userLoggedIn={true}
      />
    </div>
  )
}

export default App
