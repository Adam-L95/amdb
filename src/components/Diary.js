import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Diary = ({ diary }) => {
    const displayPoster = (posterSource) => {
        if (posterSource) {
            return <img src={`http://image.tmdb.org/t/p/w92/${posterSource}`} alt={'poster'}/>;
        }
    };

    // const toMovie = (a) => (event) => {
    //     event.preventDefault();
    //     setMovieToView(a.movieId);
    //     setPage('movie');
    // };

    const getDate = (date) => {
        return date.split(' ');
    };

    return (
        <ListGroup>
            {diary.sort((a, b) => Date.parse(b.dateLogged) - Date.parse(a.dateLogged)).map(item =>
                <Link className="list-group-item-action" key ={item._id} to={`/movies/${item.movieId}`}>
                    <p>Watched: {`${getDate(item.dateLogged)[1]} ${getDate(item.dateLogged)[2]} ${getDate(item.dateLogged)[3]}`}</p>
                    {displayPoster(item.posterPath)}
                    <h3>{item.title} ({item.releaseDate ? item.releaseDate.split('-')[0] : 'unreleased'}) </h3>
                </Link>
            )
            }
        </ListGroup>
    );
};

export default Diary;