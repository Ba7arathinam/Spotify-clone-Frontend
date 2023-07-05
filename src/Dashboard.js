import React from 'react'
import useAuth from "./useAuth"
import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from 'axios'
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"

const spotifyApi = new SpotifyWebApi({
    clientId: "93cab6ad9331469b9a2aac41c5da4215",
  })

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [coverpic, setcoverpic] = useState();
  

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
      }
    
  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3002/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          );

          const largecoverpic = track.album.images.reduce((initial, image) => {
            if (initial.height < image.height) return image;
            return initial;
          }, track.album.images[0]);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
  const handlelogout = () => {
    const url = "https://www.spotify.com/logout";
    const spotifyLogoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );
  };
  return (
    <div className="dashboard">
    <div className="top">
      <div className="img" onClick={handlelogout}>
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt=""
        />
      </div>
      <form>
          <input
            type="search"
            placeholder="search songs/artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        </div>
    
     <div className="middle" >
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && coverpic && (
          <div className="imageshow">
          <div className="image">
            {" "}
            <img loading="lazy" src={playingTrack.largerpic} alt="" />
          </div>
          <div className="lyrics">
            <h1>Enjoy the Lyrics</h1>
            <hr />
            <p>{lyrics}</p>
            {lyrics === "Lyrics of this song is not found" ? (
              ""
            ) : (
              <hr classname="hr" />
            )}
          </div>
        </div>
      )}
       
       {searchResults.length == 0 && !playingTrack && (
          <div className="welcome">
            <div className="welhead">
              <h1>
                welcome to spotify-clone search your music and enjoy listening !
              </h1>
            </div>
          </div>
        )}
     

      </div>
      <div className='botom'>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>

    </div>
  )
}
