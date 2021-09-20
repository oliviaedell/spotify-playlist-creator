import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import type { Track, Playlist } from "../Types"

import "./RemovePlaylistModal.css"

type modalProps = {
  showModal: boolean
  setShowModal: (show: boolean) => void
  playlist: Playlist
}

const RemovePlaylistModal = ({
  showModal,
  setShowModal,
  playlist,
}: modalProps) => {
  const [currentPlaylists, setCurrentPlaylists] = useState<Array<Playlist>>([])
  const [removed, setRemoved] = useState<boolean>(false)

  useEffect(() => {
    setCurrentPlaylists(JSON.parse(localStorage.playlists))
  }, [])

  const handleConfirmRemove = () => {
    currentPlaylists.splice(playlist.id, 1)
    setRemoved(true)
  }

  useEffect(() => {
    //if removed true update storage
    if (currentPlaylists && removed) {
      localStorage.setItem("playlists", JSON.stringify(currentPlaylists))
      setRemoved(false)
      setShowModal(false)
      window.location.pathname = "/playlists"
    }
  }, [removed])

  return (
    <Modal centered show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Remove {playlist.name}?</p>
        <Button variant="primary" onClick={handleConfirmRemove}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default RemovePlaylistModal
