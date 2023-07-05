import { useState, useEffect } from "react"
import SpotifyPlayer from 'react-spotify-player';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])
  const size = {
    width: '100%',
    height:100,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'white'; // or 'white'
  if (!accessToken) return null

  
  return (


       
      <SpotifyPlayer
        uri={trackUri ? [trackUri] : []}
        token={accessToken}
        showSaveIcon
        callback={state => {
                if (!state.isPlaying) setPlay(false)
              }}
              play={play}
        size={size}
        view={view}
        theme={theme}
        styles={{
            bgColor: "#181818",
            color: "#fff",
            trackArtistColor: "lightgray",
            trackNameColor: "white",
            sliderColor: "black",
            sliderHandleColor: "black",
            sliderTrackColor: "#383838",
          }}
      />
    // <SpotifyPlayer
    //   token={accessToken}
    //   showSaveIcon
    //   callback={state => {
    //     if (!state.isPlaying) setPlay(false)
    //   }}
    //   play={play}
    //   uris={trackUri ? [trackUri] : []}
    //   styles={{
    //     bgColor: "#181818",
    //     color: "#fff",
    //     trackArtistColor: "lightgray",
    //     trackNameColor: "white",
    //     sliderColor: "black",
    //     sliderHandleColor: "black",
    //     sliderTrackColor: "#383838",
    //   }}
    // />
  )
}

