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
  context?: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }
  timestamp?: number
  progress_ms?: number
  is_playing?: boolean
  currently_playing_type?: string
  item: {
    album: {
      album_type?: string
      external_urls?: {
        spotify?: string
      }
      href?: string
      id?: string
      images?: [
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
      uri?: string
    }
    artists: [
      {
        external_urls?: {
          spotify?: string
        }
        href?: string
        id?: string
        name: string
        type: string
        uri?: string
      }
    ]
    available_markets?: [string]
    disc_number?: number
    duration_ms?: number
    explicit?: boolean
    external_ids?: {
      isrc?: string
    }
    external_urls?: {
      spotify?: string
    }
    href?: string
    id: number
    name: string
    popularity?: number
    preview_url?: string
    track_number?: number
    type: string
    uri?: string
  }
}

type Playlist = {
  description?: string
  name: string
  id: number
  owner?: {
    external_urls?: {
      spotify?: string
    }
    href?: string
    id?: string
    type?: string
    uri?: string
  }
  tracks: Array<Track>

  type?: string
  uri?: string
}

export type { User, Track, Playlist }
