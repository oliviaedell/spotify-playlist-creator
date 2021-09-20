import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import type { Track, Playlist } from "../Types"

import "./NewPlaylistModal.css"

type modalProps = {
  show: boolean
  setShow: (show: boolean) => void
  currentSong: Track
}

const NewPlaylistModal = ({ show, setShow, currentSong }: modalProps) => {
  const [storedPlaylists, setStoredPlaylists] = useState<Array<Playlist>>([])
  const [playlistName, setPlaylistName] = useState<string>()
  const [playlistDescription, setPlaylistDescription] = useState<string>()
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    //get playlists from storage
    if (localStorage.playlists) {
      const playlists: Playlist[] = JSON.parse(localStorage.playlists)
      if (playlists) {
        setStoredPlaylists(playlists)
      }
    }
  }, [])

  const handleCloseModal = () => {
    setShow(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //save playlist to local storage
    if (playlistName) {
      const newPlaylist: Playlist = {
        description: playlistDescription,
        name: playlistName,
        id: storedPlaylists.length,
        tracks: [currentSong],

        type: "playlist",
      }

      if (storedPlaylists.length !== 0) {
        const arr = new Array<Playlist>(...storedPlaylists, newPlaylist)
        setStoredPlaylists(arr)
      } else {
        const arr = new Array<Playlist>(newPlaylist)
        setStoredPlaylists(arr)
      }
      setSubmitted(true)
      window.location.reload()
    }
  }
  useEffect(() => {
    if (submitted) {
      localStorage.setItem("playlists", JSON.stringify(storedPlaylists))
      handleCloseModal()
    }
  }, [submitted])

  return (
    <>
      <Modal centered show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Create new playlist with {currentSong.item.name} by{" "}
            {currentSong.item.artists[0].name}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPlaylistName">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setPlaylistName(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group controlId="newPlaylistDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setPlaylistDescription(e.target.value)
                }}
              />
            </Form.Group>
            <Button
              className="submitButton"
              variant="outline-dark"
              type="submit"
            >
              DONE
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default NewPlaylistModal
