import React, { useEffect, useState } from 'react';
import movieService from '../services/movies';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const HomePage = () => {
    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(() => {
        movieService.getNowPlaying().then(movies => setNowPlaying(movies));
    }, []);

    console.log(nowPlaying);
    if (nowPlaying.length > 0) {
        console.log(nowPlaying[0].title);
    }

    if (nowPlaying.length > 0) {
        return (
            <div>
                <h3>Now Playing: </h3>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <img src={`http://image.tmdb.org/t/p/w92/${nowPlaying[0].poster_path}`} alt='poster'/>
                        <h4>{nowPlaying[0].title}</h4>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <img src={`http://image.tmdb.org/t/p/w92/${nowPlaying[1].poster_path}`} alt='poster'/>
                        <h4>{nowPlaying[1].title}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <img src={`http://image.tmdb.org/t/p/w92/${nowPlaying[2].poster_path}`} alt='poster'/>
                        <h4>{nowPlaying[2].title}</h4>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    } else {
        return null;
    }

    // return null;
};

export default HomePage;