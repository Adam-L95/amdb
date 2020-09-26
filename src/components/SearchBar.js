import React, { useState } from 'react';
import movieService from '../services/movies';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ setMovies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getSearch = (event) => {
        event.preventDefault();
        // setQuery(searchTerm);
        movieService.searchFor(searchTerm).then(movies => setMovies(movies));


    };

    return (
        <Form onSubmit={getSearch} >
            <Form.Control className=" mr-sm-2" type="text" id="search-bar" placeholder="Search Movies..." onChange={(event) => {setSearchTerm(event.target.value);}} />
            <Button variant="primary" type="submit">Search</Button>
        </Form>
        // <form onSubmit={getSearch}>
        //     <input type="text" id="search-bar" name="Search" onChange={(event) => {setSearchTerm(event.target.value);}}/>
        //     <button type="submit" id="submit-button">Search</button>
        // </form>
    );
};

export default SearchBar;