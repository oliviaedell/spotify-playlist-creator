import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Dropdown from "react-bootstrap/Dropdown"
import type { Track, Playlist } from "../Types"

import "./CurrentSongCard.css"

type cardProps = {
  currentSong: Track
  setShowModal: (show: boolean) => void
}

const CurrentSongCard = ({ currentSong, setShowModal }: cardProps) => {
  const [currentPlaylists, setCurrentPlaylists] = useState<Array<Playlist>>()
  const [selectedPlaylistID, setSelectedPlaylistID] = useState<number>(-1)
  const [newTracklist, setNewTracklist] = useState<Array<Track>>([])
  const [trackAdded, setTrackAdded] = useState<boolean>()

  useEffect(() => {
    if (localStorage.playlists) {
      setCurrentPlaylists(JSON.parse(localStorage.playlists))
    }
  }, [])

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleAddTrack = (playlistID: number) => {
    //TODO add track to playlist in local storage using setCurrentPlaylists
    if (currentPlaylists) {
      setSelectedPlaylistID(playlistID)
      setNewTracklist([...currentPlaylists[playlistID].tracks, currentSong])
      currentPlaylists[playlistID].tracks = newTracklist
      setTrackAdded(true)
    }
  }

  useEffect(() => {
    if (trackAdded && currentPlaylists) {
      currentPlaylists[selectedPlaylistID].tracks = newTracklist
      localStorage.setItem("playlists", JSON.stringify(currentPlaylists))
    }
  })

  return (
    <Card className="songCard" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          className="albumImg"
          variant="top"
          src={
            currentSong.item.album.images
              ? currentSong.item.album.images[0].url
              : ""
          }
        />
        <Card.Title>{currentSong ? `${currentSong.item.name}` : ""}</Card.Title>
        <Card.Subtitle>
          {currentSong ? `${currentSong.item.artists[0].name}` : ""}
        </Card.Subtitle>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            Add to Playlist
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="newPlaylistItem"
              onClick={handleShowModal}
            >
              Create New Playlist
            </Dropdown.Item>
            {currentPlaylists ? (
              currentPlaylists.map((playlist, i) => (
                <Dropdown.Item
                  className="existingPlaylistItem"
                  onClick={() => handleAddTrack(i)}
                >
                  {playlist.name}
                </Dropdown.Item>
              ))
            ) : (
              <></>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  )
}

export default CurrentSongCard
