import React, { useEffect, useState } from "react"
import axios from "axios"

import NewPlaylistModal from "../components/NewPlaylistModal"
import CurrentSongCard from "../components/CurrentSongCard"

import "./CurrentSongPage.css"

const USER_ENDPOINT = "https://api.spotify.com/v1/me"
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing"

type User = {
  country: string
  display_name: string
  email?: string
  external_urls?: {
    spotify: string
  }
  followers?: {
    href: null | string
    total: number
  }
  href?: string
  id?: string
  images?: [
    {
      height: null | number
      url: string
      width: null | string
    }
  ]
  product?: string
  type?: string
  uri?: string
}

type Track = {
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }
  timestamp: number
  progress_ms: number
  is_playing: boolean
  currently_playing_type: string
  item: {
    album: {
      album_type: string
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: [
        {
          height: number
          url: string
          width: number
        },
        {
          height: number
          url: string
          width: number
        },
        {
          height: number
          url: string
          width: number
        }
      ]
      name: string
      type: string
      uri: string
    }
    artists: [
      {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }
    ]
    available_markets: [string]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
      isrc: string
    }
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
}

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
  const [user, setUser] = useState<User>()
  const [currentSong, setCurrentSong] = useState<Track>()
  const [seconds, setSeconds] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  /* set access token */
  useEffect(() => {
    if (window.location.hash) {
      const authParams = getAuthParams(window.location.hash.substring(1))
      setAccessToken(authParams["access_token"])
    }
  }, [])

  /* set user */
  useEffect(() => {
    if (accessToken) {
      axios
        .get(USER_ENDPOINT, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUser(response.data as User)
        })
        .catch((err) => console.log(err))
    }
  }, [accessToken])

  /* set current song */
  useEffect(() => {
    if (accessToken && user) {
      setInterval(() => {
        axios
          .get(CURRENTLY_PLAYING_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setCurrentSong(response.data as Track)
          })
          .catch((err) => console.log(err))

        setSeconds((seconds) => seconds + 1)
      }, 1000)
    }
  }, [accessToken, user])

  //   const handleShowModal = () => {
  //     setShowModal(true)
  //   }

  return (
    <>
      <h1>Current Song</h1>
      {currentSong ? (
        <>
          <CurrentSongCard
            currentSong={currentSong}
            setShowModal={setShowModal}
          />

          <NewPlaylistModal
            show={showModal}
            setShow={setShowModal}
          ></NewPlaylistModal>
        </>
      ) : (
        <h2>no song currently playing</h2>
      )}
    </>
  )
}
export default CurrentSong
export type { Track }
