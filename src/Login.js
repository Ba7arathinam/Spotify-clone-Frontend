import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=93cab6ad9331469b9a2aac41c5da4215&response_type=code&redirect_uri=https://spotify-clone-app-bala.onrender.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="login">
    <img
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
      alt=""
    />
    <a href={AUTH_URL}>
      <button className="btn">Login with Spotify</button>
    </a>
  </div>
  )
}