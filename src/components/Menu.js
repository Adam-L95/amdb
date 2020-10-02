import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    // const padding = {
    //     paddingRight: 5
    // };

    // const toPage = (page) => (event) => {
    //     event.preventDefault();
    //     props.setPage(page);
    //     props.setMovieToView(null);
    // };

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Link to="/" className="navbar-brand">AMDb</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/search" className="nav-link">
                            Search
                        </Link>
                        {props.user ?
                            <Link to="/watchlist" className="nav-link">
                                Watchlist ({props.watchlist.length})
                            </Link>
                            :
                            null
                        }
                        {props.user ?
                            <Link to="/diary" className="nav-link">
                                Diary ({props.diary.length})
                            </Link>
                            :
                            null
                        }
                    </Nav>
                    <Nav>
                        {props.user ? <Nav.Link>{props.user.username}</Nav.Link> : <Link className="nav-link" to="/login">login</Link>}
                        {props.user ? <Nav.Link onClick={props.handleLogout}>Log out</Nav.Link> : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Menu;