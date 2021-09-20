import React, { useEffect, useState } from "react"
//import axios from "axios"

import NewPlaylistModal from "../components/NewPlaylistModal"
import CurrentSongCard from "../components/CurrentSongCard"
import type { Track } from "../Types"
import "./CurrentSongPage.css"

const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing"

/* split parameters from url after login into key-value pairs */
const getAuthParams = (hash: string) => {
  const params = hash.split("&")
  const paramsReduce = params.reduce<Record<string, string>>((acc, curr) => {
    const [key, val]: string[] = curr.split("=")
    acc[key] = val
    return acc
  }, {})

  return paramsReduce
}

const CurrentSong = () => {
  const [accessToken, setAccessToken] = useState<string>()
  const [currentSong, setCurrentSong] = useState<Track>()
  const [storedSongName, setStoredSongName] = useState<string>()
  const [contentLoaded, setContentLoaded] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  /* set access token */
  useEffect(() => {
    if (window.location.hash) {
      const authParams = getAuthParams(window.location.hash.substring(1))
      setAccessToken(authParams["access_token"])
    } else if (localStorage.accessToken) {
      setAccessToken(localStorage.accessToken)
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken)
    }
  }, [accessToken])

  /* set current song */
  useEffect(() => {
    if (accessToken) {
      setInterval(() => {
        fetch(CURRENTLY_PLAYING_ENDPOINT, {
          credentials: "omit",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => {
            response.json().then((data) => setCurrentSong(data as Track))
          })
          .catch((err) => console.log(err))
      }, 1000)
    }
  }, [accessToken])

  useEffect(() => {
    if (currentSong) {
      setContentLoaded(true)
    }
  }, [currentSong])

  useEffect(() => {
    if (accessToken && currentSong) {
      //&&user
      if (!storedSongName || currentSong.item.name !== storedSongName) {
        setStoredSongName(currentSong.item.name)
        localStorage.setItem("currentSong", JSON.stringify(currentSong))
      }
    }
  }, [accessToken, currentSong, storedSongName])

  return !accessToken ? (
    <>
      <h2>
        Please <a href="/login">log in</a> to Spotify
      </h2>
    </>
  ) : (
    <>
      <h3>You are currently listening to: </h3>
      <CurrentSongCard
        loaded={contentLoaded}
        currentSong={currentSong}
        setShowModal={setShowModal}
      />

      {currentSong ? (
        <NewPlaylistModal
          show={showModal}
          setShow={setShowModal}
          currentSong={currentSong}
        ></NewPlaylistModal>
      ) : (
        <></>
      )}
    </>
  )
}

export default CurrentSong
