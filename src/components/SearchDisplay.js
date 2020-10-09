import React, { useState, useEffect } from 'react';
import MovieSearchDisplay from './MovieSearchDisplay';
import movieService from '../services/movies';
import { ListGroup, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SearchDisplay = () => {
    const [movies, setMovies] = useState([]);
    const searchTerm = useParams().searchTerm;
    useEffect(() => {
        movieService.searchFor(searchTerm).then(movies => setMovies(movies));
    }, []);

    // const searchTerm = useParams().searchTerm;

    // movieService.searchFor(searchTerm).then(movies => setMovies(movies));

    if (movies.length !== 0) {

        return (
            <div>
                <br />
                <h4>
                    Results for '{searchTerm.replaceAll('+', ' ')}':
                </h4>
                <br/>
                <Table striped>
                    <tbody>
                        {movies.sort((a, b) =>
                            a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0)
                            .map(movie => <MovieSearchDisplay key={movie.id}
                                title={movie.title}
                                release_date={movie.release_date}
                                poster_path={movie.poster_path}
                                id={movie.id} />)}
                    </tbody>
                </Table>
            </div>
        );
    } else {
        return (
            <div>
                <h4>
                    No Results
                </h4>
                No results were found for your search term
            </div>
        );
    }
};

export default SearchDisplay;