import React from 'react';

const Watchlist = ({ watchlist, setMovieToView, setPage }) => {
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
            <ul>
                {watchlist.map(item =>
                    <a href="/#" onClick={toMovie(item)} key ={item.movieId}>
                        <li>
                            {displayPoster(item.posterPath)}
                            <h3>{item.title} ({item.releaseDate ? item.releaseDate.split('-')[0] : 'unreleased'}) </h3>
                        </li>
                    </a>
                )
                }
            </ul>
        </div>
    );
};

export default Watchlist;
