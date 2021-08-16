import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavBar() {
    return (
      <Navbar className="nv" style={{ display: "flex", justifyContent: "center",}}>
        <Navbar.Text>
          <h2>Weight Tracker</h2>
        </Navbar.Text>
      </Navbar>
    );
}
