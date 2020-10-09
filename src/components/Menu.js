import React from 'react';
import SearchBar from '../components/SearchBar';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = (props) => {

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Link to="/" className="navbar-brand">AMDb</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
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
                        {props.user ? <div className='nav-link'>{props.user.username}</div> : <Link className="nav-link" to="/login">login</Link>}
                        {props.user ? <Nav.Link onClick={props.handleLogout}>Log out</Nav.Link> : null}
                    </Nav>
                </Navbar.Collapse>
                <SearchBar />
            </Navbar>
        </div>
    );
};

export default Menu;