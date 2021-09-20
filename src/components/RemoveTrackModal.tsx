import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import type { Track, Playlist } from "../Types"

import "./RemoveTrackModal.css"

type modalProps = {
  showModal: boolean
  setShowModal: (show: boolean) => void
  selectedTrackID: number
  playlist: Playlist
}

const RemoveTrackModal = ({
  showModal,
  setShowModal,
  selectedTrackID,
  playlist,
}: modalProps) => {
  const [storedPlaylists, setStoredPlaylists] = useState<Array<Playlist>>([])
  const [selectedTrack, setSelectedTrack] = useState<Track>()
  const [removed, setRemoved] = useState<boolean>(false)

  useEffect(() => {
    setStoredPlaylists(JSON.parse(localStorage.playlists))
    setSelectedTrack(playlist.tracks[selectedTrackID])
  }, [])

  const handleConfirmRemove = () => {
    if (storedPlaylists && playlist.tracks) {
      playlist.tracks.splice(selectedTrackID, 1)
      storedPlaylists[playlist.id].tracks = playlist.tracks
      setRemoved(true)
    }
  }
  useEffect(() => {
    if (removed) {
      localStorage.setItem("playlists", JSON.stringify(storedPlaylists))
      setRemoved(false)
      setShowModal(false)
    }
  }, [removed])

  return (
    <Modal centered show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Song from Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Remove {selectedTrack ? selectedTrack.item.name : "null"} by
          {selectedTrack
            ? selectedTrack.item.artists[0].name
            : "null"} from {playlist.name}?
        </p>
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

export default RemoveTrackModal
