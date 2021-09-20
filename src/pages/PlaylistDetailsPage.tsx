import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import type { Playlist } from "../Types"

import "./PlaylistDetailsPage.css"
import RemoveTrackModal from "../components/RemoveTrackModal"
import RemovePlaylistModal from "../components/RemovePlaylistModal"
import ErrorComponent from "../components/ErrorComponent"

type detailsProps = {
  playlistIndex: number
}

const PlaylistDetails = ({ playlistIndex }: detailsProps) => {
  const [playlist, setPlaylist] = useState<Playlist>()
  const [showRemoveTrackModal, setShowRemoveTrackModal] =
    useState<boolean>(false)
  const [showRemovePlaylistModal, setShowRemovePlaylistModal] =
    useState<boolean>(false)
  const [trackIndex, setTrackIndex] = useState<number>()
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (
      playlistIndex !== undefined &&
      playlistIndex < localStorage.playlists.length - 1
    ) {
      setPlaylist(JSON.parse(localStorage.playlists)[playlistIndex])
    } else {
      setError(true)
      setErrorMessage("Could not load playlist")
    }
  }, [])

  const handleTrackModalClick = (i: number) => {
    setTrackIndex(i)
    setShowRemoveTrackModal(true)
  }

  const handlePlaylistModalClick = () => {
    setShowRemovePlaylistModal(true)
  }

  return !error ? (
    playlist ? (
      <>
        <h1>Playlist Details</h1>
        <h2>{playlist.name}</h2>
        <ListGroup className="songList">
          {playlist.tracks.length ? (
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
              <p>no tracks </p>
            </>
          )}
        </ListGroup>
        <Button variant="danger" onClick={handlePlaylistModalClick}>
          Remove Playlist
        </Button>

        {trackIndex !== undefined ? (
          <RemoveTrackModal
            showModal={showRemoveTrackModal}
            setShowModal={setShowRemoveTrackModal}
            selectedTrackIndex={trackIndex}
            playlist={playlist}
            playlistIndex={playlistIndex}
          />
        ) : (
          <></>
        )}

        <RemovePlaylistModal
          showModal={showRemovePlaylistModal}
          setShowModal={setShowRemovePlaylistModal}
          playlist={playlist}
          playlistIndex={playlistIndex}
        />
      </>
    ) : (
      <></>
    )
  ) : (
    <ErrorComponent message={errorMessage} />
  )
}

export default PlaylistDetails
