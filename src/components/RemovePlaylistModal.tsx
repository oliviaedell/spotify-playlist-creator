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
  playlistIndex: number
}

const RemovePlaylistModal = ({
  showModal,
  setShowModal,
  playlist,
  playlistIndex,
}: modalProps) => {
  const [currentPlaylists, setCurrentPlaylists] = useState<Array<Playlist>>([])
  const [removed, setRemoved] = useState<boolean>(false)

  useEffect(() => {
    setCurrentPlaylists(JSON.parse(localStorage.playlists))
  }, [])

  const handleConfirmRemove = () => {
    currentPlaylists.splice(playlistIndex, 1)
    setRemoved(true)
  }

  useEffect(() => {
    //if removed true update storage
    if (currentPlaylists && removed) {
      localStorage.setItem("playlists", JSON.stringify(currentPlaylists))
      setRemoved(false)
      setShowModal(false)
      const url: string = window.location.href
      window.location.pathname = url.split("?")[0]
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
