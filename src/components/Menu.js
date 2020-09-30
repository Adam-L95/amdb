import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Menu = (props) => {
    const padding = {
        paddingRight: 5
    };

    const toPage = (page) => (event) => {
        event.preventDefault();
        props.setPage(page);
        props.setMovieToView(null);
    };

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#" onClick={toPage('home')}>AMDb</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/#" onClick={toPage('search')}>Search</Nav.Link>
                        <Nav.Link href="/#" onClick={toPage('watchlist')}>Watchlist ({props.watchlist.length})</Nav.Link>
                        <Nav.Link href="/#" onClick={toPage('diary')}>Diary ({props.diary.length})</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/#">{props.username}</Nav.Link>
                        <Nav.Link onClick={props.handleLogout}>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Menu;