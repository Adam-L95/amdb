import React from 'react';
import MovieSearchDisplay from './MovieSearchDisplay';
import { ListGroup } from 'react-bootstrap';

const SearchDisplay = ({ movies, setMovieToView, setPage, watchlist, setWatchlist, setNotify }) => {
    // const resultsToShow = props.movies.filter(movie => movie.title.includes(props.query));

    if (movies.length === 0){
        return (
            <div></div>
        );
    } else {
        return (
            <div>
                <h4>
                    Results:
                </h4>
                <ListGroup>
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
                            setWatchlist={setWatchlist}
                            setNotify={setNotify} />)}
                </ListGroup>
            </div>
        );
    }
};

export default SearchDisplay;