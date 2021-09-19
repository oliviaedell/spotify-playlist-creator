import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import "./NewPlaylistModal.css"

type modalProps = {
  show: boolean
  setShow: (show: boolean) => void
}

const NewPlaylistModal = ({ show, setShow }: modalProps) => {
  const handleCloseModal = () => {
    setShow(false)
  }

  return (
    <>
      <Modal centered show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>TODO form to create playlist</Modal.Body>
        <Button variant="outline-dark" onClick={handleCloseModal}>
          DONE
        </Button>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default NewPlaylistModal
