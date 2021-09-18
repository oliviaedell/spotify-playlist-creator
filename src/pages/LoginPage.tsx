import './LoginPage.css'

//Setup spotify auth
const SP_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const CLIENT_ID = '9d0ada30ed304c2fac2271ea7e085b15'
const REDIRECT_URI = 'http://localhost:3000/current-song'

const SCOPES = ['user-read-currently-playing']

//handler for login button click
const handleLogin = () => {
    window.location.href = `${SP_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`
}

const Login = () => {

    return (
        <>
        <h1> Login to Spotify</h1>
        <button onClick = {handleLogin}> Login to Spotify </button>

        </>
    )


}

export default Login