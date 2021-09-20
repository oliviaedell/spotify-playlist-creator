import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import "./Navi.css"

const Navi = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken")
  }
  return (
    <>
      <Navbar>
        <Navbar.Brand href="/current-song">
          Spotify Playlist Creator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex">
          <Nav className="me-auto">
            <Nav.Link href="/current-song">Current Song</Nav.Link>
            <Nav.Link href="/playlists">Playlists</Nav.Link>
            <Nav.Link
              href="/login"
              onClick={handleLogout}
              className="align-self-end"
            >
              {window.location.pathname === "/login" ? "Log In" : "Log Out"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navi
