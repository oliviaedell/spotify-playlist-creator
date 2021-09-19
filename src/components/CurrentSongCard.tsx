import Card from "react-bootstrap/Card"
import Dropdown from "react-bootstrap/Dropdown"
import type { Track } from "../pages/CurrentSongPage"

import "./CurrentSongCard.css"

type cardProps = {
  currentSong: Track
  setShowModal: (show: boolean) => void
}

const CurrentSongCard = ({ currentSong, setShowModal }: cardProps) => {
  const handleShowModal = () => {
    setShowModal(true)
  }
  return (
    <Card className="songCard" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Img
          className="albumImg"
          variant="top"
          src={currentSong ? currentSong.item.album.images[0].url : ""}
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
            <Dropdown.Item onClick={handleShowModal}>
              Create New Playlist
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  )
}

export default CurrentSongCard
