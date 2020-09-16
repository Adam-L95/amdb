import React, { useState } from 'react';
import movieService from '../services/movies';

const SearchBar = ({ setMovies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getSearch = (event) => {
        event.preventDefault();
        // setQuery(searchTerm);
        movieService.searchFor(searchTerm).then(movies => setMovies(movies));


    };

    return (
        <form onSubmit={getSearch}>
            <input type="text" id="search-bar" name="Search" onChange={(event) => {setSearchTerm(event.target.value);}}/>
            <button type="submit" id="submit-button">Search</button>
        </form>
    );
};

export default SearchBar;