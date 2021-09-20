import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { ListGroup, Modal } from "react-bootstrap"
import type { Playlist } from "../Types"

import "./PlaylistDetailsPage.css"

type detailsProps = {
  playlist_id: number
}

const PlaylistDetails = ({ playlist_id }: detailsProps) => {
  const [playlist, setPlaylist] = useState<Playlist>()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    console.log(playlist_id || playlist_id === 0)
    if (playlist_id || playlist_id === 0) {
      setPlaylist(JSON.parse(localStorage.playlists)[playlist_id])
    }
  }, [])

  const handleShowModal = () => {
    setShowModal(!showModal)
  }
  const handleConfirmRemove = () => {
    //TODO: remove from playlist and update local storage
    setShowModal(false)
  }
  return playlist ? (
    <>
      <h1>Playlist Details</h1>
      <h2>{playlist.name}</h2>
      <ListGroup className="songList">
        {playlist.tracks ? (
          playlist.tracks.items.map((track, i) => (
            <div className="d-flex">
              <ListGroup.Item className="trackInfo">
                {/* TODO album cover */}
                <p>{track.item.name ? track.item.name : ""}</p>
                <p>
                  {track.item.artists[0].name ? track.item.artists[0].name : ""}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button onClick={handleShowModal}>X</Button>
              </ListGroup.Item>
              <Modal centered show={showModal} onHide={handleShowModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Remove Song from Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Remove {track.item.name} by {track.item.artists[0].name}{" "}
                    from {playlist.name}?
                  </p>
                  <Button variant="primary" onClick={handleConfirmRemove}>
                    Confirm
                  </Button>
                  <Button variant="secondary" onClick={handleShowModal}>
                    Cancel
                  </Button>
                </Modal.Body>
              </Modal>
            </div>
          ))
        ) : (
          <>
            <h1>no playlist </h1>
          </>
        )}
      </ListGroup>
    </>
  ) : (
    <></>
  )
}

export default PlaylistDetails
