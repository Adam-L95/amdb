import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Watchlist = ({ username, watchlist, setMovieToView, setPage }) => {
    const displayPoster = (posterSource) => {
        if (posterSource) {
            return <img src={`http://image.tmdb.org/t/p/w92/${posterSource}`} alt={'poster'}/>;
        }
    };

    const toMovie = (a) => (event) => {
        event.preventDefault();
        setMovieToView(a.movieId);
        setPage('movie');
    };

    return (
        <div>
            <h3>Your Watchlist</h3>
            <ListGroup >
                {watchlist.map(item =>
                    <ListGroup.Item action href="/#" onClick={toMovie(item)} key ={item.movieId}>
                        {displayPoster(item.posterPath)}
                        <h3>{item.title} ({item.releaseDate ? item.releaseDate.split('-')[0] : 'unreleased'}) </h3>
                    </ListGroup.Item>
                )
                }
            </ListGroup>
        </div>
    );
};

export default Watchlist;
