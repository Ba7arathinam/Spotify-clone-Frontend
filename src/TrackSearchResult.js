import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className="displaysong" onClick={handlePlay}>
    <div className="img">
      <img src={track.albumUrl} alt="" />
    </div>

    <div className="text-part">
      <p className="name">{track.title}</p>
      <p className="artist">{track.artist}</p>
    </div>
  </div>
  )
}
