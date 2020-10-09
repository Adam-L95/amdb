import React, { useEffect, useState } from 'react';
import movieService from '../services/movies';
import FilmCard from './FilmCard';
import { ListGroup } from 'react-bootstrap';


const HomePage = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    let itemsToDisplay = 0;
    if (typeof window.orientation !== 'undefined') {
        itemsToDisplay = 3;
    } else {
        itemsToDisplay = 6;
    }

    useEffect(() => {
        movieService.getNowPlaying().then(movies => setNowPlaying(movies));
    }, []);

    if (nowPlaying.length > 0) {
        return (
            <div>
                <h3>Now Playing: </h3>
                <br />
                <ListGroup horizontal>
                    {nowPlaying.sort((a, b) => a.vote_count < b.vote_count ? 1 : a.vote_count > b.vote_count ? -1 : 0)
                        .slice(0, itemsToDisplay).map(movie =>
                            // <Link to={`/movies/${movie.id}`} className="list-group-item-action" key={movie.id}>
                            //     <img src={`http://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt='poster'/>
                            // </Link>)
                            <FilmCard movie={movie} cardSize='18rem' key={movie.id} showCaption={true} />
                        )}
                </ListGroup>
            </div>
        );
    } else {
        return null;
    }

    // return null;
};

export default HomePage;