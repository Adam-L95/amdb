import React from 'react';
import MovieSearchDisplay from './MovieSearchDisplay';

const SearchDisplay = ({ movies, setMovieToView, setPage, watchlist, setWatchlist }) => {
    // const resultsToShow = props.movies.filter(movie => movie.title.includes(props.query));

    if (movies.length === 0){
        return (
            <div></div>
        );
    } else {
        return (
            <div>
                {movies.sort((a, b) =>
                    a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0)
                    .map(movie => <MovieSearchDisplay key={movie.id}
                        title={movie.title}
                        release_date={movie.release_date}
                        // description={movie.overview}
                        poster_path={movie.poster_path}
                        id={movie.id}
                        setMovieToView={setMovieToView}
                        setPage={setPage}
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}/>)}
            </div>
        );
    }
};

export default SearchDisplay;