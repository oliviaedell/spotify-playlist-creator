import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import type { Playlist } from "../Types"

import "./PlaylistDetailsPage.css"
import RemoveTrackModal from "../components/RemoveTrackModal"
import RemovePlaylistModal from "../components/RemovePlaylistModal"

type detailsProps = {
  playlist_id: number
}

const PlaylistDetails = ({ playlist_id }: detailsProps) => {
  const [playlist, setPlaylist] = useState<Playlist>()
  const [showRemoveTrackModal, setShowRemoveTrackModal] =
    useState<boolean>(false)
  const [showRemovePlaylistModal, setShowRemovePlaylistModal] =
    useState<boolean>(false)
  const [trackID, setTrackID] = useState<number>()

  useEffect(() => {
    if (playlist_id || playlist_id === 0) {
      setPlaylist(JSON.parse(localStorage.playlists)[playlist_id])
    }
  }, [])

  const handleTrackModalClick = (i: number) => {
    setTrackID(i)
    setShowRemoveTrackModal(true)
  }
  const handlePlaylistModalClick = () => {
    setShowRemovePlaylistModal(true)
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
                <div className="d-flex">
                  <img
                    src={
                      track.item.album.images
                        ? track.item.album.images[0].url
                        : "#"
                    }
                    style={{ width: "4rem", marginRight: "1rem" }}
                    alt="album artwork"
                  />
                  <p>
                    {track.item.name ? track.item.name : ""}
                    <br />
                    {track.item.artists[0].name
                      ? track.item.artists[0].name
                      : ""}
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="outline-dark"
                  style={{ margin: "1rem" }}
                  onClick={() => handleTrackModalClick(i)}
                >
                  X
                </Button>
              </ListGroup.Item>
            </div>
          ))
        ) : (
          <>
            <h1>no tracks </h1>
          </>
        )}
      </ListGroup>
      <Button variant="danger" onClick={handlePlaylistModalClick}>
        Remove Playlist
      </Button>

      {/* TODO fix bugs */}
      {trackID ? (
        <RemoveTrackModal
          showModal={showRemoveTrackModal}
          setShowModal={setShowRemoveTrackModal}
          selectedTrackID={trackID}
          playlist={playlist}
        />
      ) : (
        <></>
      )}

      <RemovePlaylistModal
        showModal={showRemovePlaylistModal}
        setShowModal={setShowRemovePlaylistModal}
        playlist={playlist}
      />
    </>
  ) : (
    <></>
  )
}

export default PlaylistDetails
