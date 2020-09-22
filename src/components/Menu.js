import React from 'react';

const Menu = (props) => {
    const padding = {
        paddingRight: 5
    };

    const toPage = (page) => (event) => {
        event.preventDefault();
        props.setPage(page);
        // props.setMovies([]);
        props.setMovieToView(null);
    };

    return (
        <div>
            <nav>
                <ul>
                    <h3>
                        {props.username}
                    </h3>
                    <div>
                        <a href="/#" onClick={toPage('home')} style={padding}>Home</a>
                        <a href="/#" onClick={toPage('search')} style={padding}>Search</a>
                        <a href="/#" onClick={toPage('watchlist')} style={padding}>Watchlist ({props.watchlist.length})</a>
                        <a href="/#" onClick={toPage('diary')} style={padding}>Diary ({props.diary.length})</a>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;