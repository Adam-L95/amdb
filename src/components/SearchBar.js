import React, { useState } from 'react';
import movieService from '../services/movies';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const history = useHistory();

    const getSearch = (event) => {
        event.preventDefault();
        const searchFor = searchTerm.replace(/\s+/g, '+');
        // setSearchTerm('');
        console.log(searchFor);
        history.push(`/search/${searchFor}`);
    };

    return (
        <Form onSubmit={getSearch} >
            <Form.Control className=" mr-sm-2" type="text" id="search-bar" placeholder="Search Movies..." onChange={(event) => {setSearchTerm(event.target.value);}} />
            <Button variant="primary" type="submit">Search</Button>
        </Form>
    );
};

export default SearchBar;