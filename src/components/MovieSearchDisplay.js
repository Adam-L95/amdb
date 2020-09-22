import React from 'react';
import WatchlistButton from './WatchlistButton';

const MovieSearchDisplay = ({ title, release_date, poster_path, id, setPage, setMovieToView, watchlist, setWatchlist }) => {
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
            <a href="/#" onClick={toMovie}>
                <h3>
                    {displayPoster(poster_path)}
                    {title} ({release_date ? release_date.split('-')[0] : 'unreleased'})
                </h3>
            </a>
            {/* <h3>
                {displayPoster(poster_path)}
                {title} ({release_date ? release_date.split('-')[0] : 'unreleased'})
            </h3> */}
            {/* <div>
                {description}
            </div> */}
            {/* <div>
                <button onClick={toMovie} >view details</button>
            </div> */}
            <div>
                <WatchlistButton id={id}
                    title={title}
                    poster_path={poster_path}
                    release_date={release_date}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist} />
            </div>
        </div>
    );
};

export default MovieSearchDisplay;