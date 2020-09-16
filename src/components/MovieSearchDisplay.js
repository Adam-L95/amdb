import React from 'react';

const MovieSearchDisplay = ({ title, releaseDate, description, posterSource, id, setPage, setMovieToView }) => {
    const displayPoster = (posterSource) => {
        if (posterSource) {
            return <img src={`http://image.tmdb.org/t/p/w92/${posterSource}`} alt={`movie #${id} poster`}/>;
        }
    };

    const toMovie = (event) => {
        event.preventDefault();
        setMovieToView(id);
        setPage('movie');
    };

    return (
        <div>
            <h3>
                {displayPoster(posterSource)}
                {title} ({releaseDate ? releaseDate.split('-')[0] : 'unreleased'})
            </h3>
            <div>
                {description}
            </div>
            <div>
                <button onClick={toMovie}>view details</button>
            </div>
            <div>
                <button>add to watchlist</button>
            </div>
        </div>
    );
};

export default MovieSearchDisplay;