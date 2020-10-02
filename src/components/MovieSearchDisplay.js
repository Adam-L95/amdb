import React from 'react';
// import WatchlistButton from './WatchlistButton';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieSearchDisplay = ({ title, release_date, poster_path, id }) => {
    const displayPoster = (posterSource) => {
        if (posterSource) {
            return <img src={`http://image.tmdb.org/t/p/w92/${posterSource}`} alt={`movie #${id} poster`}/>;
        }
    };

    // const toMovie = (event) => {
    //     event.preventDefault();
    //     setMovieToView(id);
    //     setPage('movie');
    // };

    return (
        <Link to={`/movies/${id}`} className="list-group-item-action">
            <h3>
                {displayPoster(poster_path)}
                {title} ({release_date ? release_date.split('-')[0] : 'unreleased'})
            </h3>
        </Link>
    );
};

export default MovieSearchDisplay;