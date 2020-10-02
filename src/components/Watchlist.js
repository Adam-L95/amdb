import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Watchlist = ({ watchlist }) => {
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

    return (
        <div>
            <h3>Your Watchlist</h3>
            <ListGroup >
                {watchlist.map(item =>
                    <Link className="list-group-item-action" key ={item.movieId} to={`/movies/${item.movieId}`}>
                        {displayPoster(item.posterPath)}
                        <h3>{item.title} ({item.releaseDate ? item.releaseDate.split('-')[0] : 'unreleased'}) </h3>
                    </Link>
                )
                }
            </ListGroup>
        </div>
    );
};

export default Watchlist;
