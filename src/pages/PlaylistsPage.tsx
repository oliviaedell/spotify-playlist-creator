import { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import type { Playlist } from "../Types"
import "./PlaylistsPage.css"

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Array<Playlist>>([])

  useEffect(() => {
    //get playlists from localstorage
    setPlaylists(JSON.parse(localStorage.playlists))
  }, [])

  return (
    <>
      <h1> Playlists</h1>
      <div className="card-deck d-flex flex-wrap">
        {playlists ? (
          playlists.map((playlist, i) => (
            <Card
              className="playlist-card"
              style={{ width: "20rem" }} //
              key={i}
              onClick={() =>
                window.location.assign(`/playlist-details?playlistid=${i}`)
              }
            >
              <Card.Body>
                <Card.Title>{playlist.name}</Card.Title>
                <Card.Text>
                  {playlist.description ? playlist.description : " "}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Playlists
