type Track = {
  item: {
    album: {
      images?: [
        {
          height: number
          url: string
          width: number
        }
      ]
      name: string
      type: string
    }
    artists: [
      {
        name: string
      }
    ]

    id: number
    name: string
    type: string
  }
}

type Playlist = {
  description?: string
  name: string
  tracks: Array<Track>
  type?: string
}

export type { Track, Playlist }
