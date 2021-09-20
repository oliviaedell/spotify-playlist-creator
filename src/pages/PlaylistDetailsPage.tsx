import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import type { Playlist } from "../Types"

import "./PlaylistDetailsPage.css"
import RemoveTrackModal from "../components/RemoveTrackModal"

type detailsProps = {
  playlist_id: number
}

const PlaylistDetails = ({ playlist_id }: detailsProps) => {
  const [playlist, setPlaylist] = useState<Playlist>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [trackID, setTrackID] = useState<number>()

  useEffect(() => {
    if (playlist_id || playlist_id === 0) {
      setPlaylist(JSON.parse(localStorage.playlists)[playlist_id])
    }
  }, [])

  const handleModalClick = (i: number) => {
    setTrackID(i)
    setShowModal(true)
  }

  return playlist ? (
    <>
      <h1>Playlist Details</h1>
      <h2>{playlist.name}</h2>
      <ListGroup className="songList">
        {playlist.tracks ? (
          playlist.tracks.map((track, i) => (
            <div className="d-flex">
              <ListGroup.Item className="trackInfo">
                {/* TODO album cover */}
                <p>{track.item.name ? track.item.name : ""}</p>
                <p>
                  {track.item.artists[0].name ? track.item.artists[0].name : ""}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button onClick={() => handleModalClick(i)}>X</Button>
              </ListGroup.Item>
            </div>
          ))
        ) : (
          <>
            <h1>no tracks </h1>
          </>
        )}
      </ListGroup>
      {trackID ? (
        <RemoveTrackModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTrackID={trackID}
          playlist={playlist}
        />
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  )
}

export default PlaylistDetails
