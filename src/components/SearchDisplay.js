import React from 'react';
import MovieSearchDisplay from './MovieSearchDisplay';

const SearchDisplay = ({ movies, setMovieToView, setPage }) => {
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
                        releaseDate={movie.release_date}
                        description={movie.overview}
                        posterSource={movie.poster_path}
                        id={movie.id}
                        setMovieToView={setMovieToView}
                        setPage={setPage}/>)}
            </div>
        );
    }
};

export default SearchDisplay;