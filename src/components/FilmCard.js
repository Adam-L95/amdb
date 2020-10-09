import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const FilmCard = ({ movie, cardSize, showCaption }) => {

    return (
        <Link to={`/movies/${movie.id}`} className="card" style ={{ width: cardSize }}>
            <Card.Img variant='top' src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}/>
            {showCaption ? <Card.Body>
                <Card.Title>{movie.title} ({movie.release_date ? movie.release_date.split('-')[0] : 'unreleased'})</Card.Title>
            </Card.Body>
                : null
            }
        </Link>
    );

};

export default FilmCard;