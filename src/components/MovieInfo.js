import React, { useEffect, useState } from 'react';
import WatchlistButton from './WatchlistButton';
import DiaryButton from './DiaryButton';
import FilmCard from './FilmCard';
import movieService from '../services/movies';
import { Button, ButtonGroup, ToggleButton, ListGroup, Spinner } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

const MovieInfo = ({ watchlist, setWatchlist, setDiary, setNotifyMessage, setErrorMessage, user }) => {
    const [details, setDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [view, setView] = useState('cast');
    const [viewAll, setViewAll] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);

    const id = useParams().id;

    const history = useHistory();

    useEffect(() => {
        setView('cast');
        movieService.getSelected(id).then(detail => {
            setDetails(detail);});
        movieService.getCredits(id).then(credit => {
            setCredits(credit);});
        movieService.getSimilar(id).then(movie => {
            setSimilarMovies(movie);
        });
    }, [id]);

    const toView = (page) => (event) => {
        event.preventDefault();
        setViewAll(false);
        setView(page);
    };

    const toLogin = (event) => {
        event.preventDefault();
        history.push('/login');
    };

    const viewOption = (event) => {
        event.preventDefault();
        setViewAll(!viewAll);
    };

    const getDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const rDate = new Date(date);

        return `${monthNames[rDate.getMonth()]} ${rDate.getDate()} ${rDate.getFullYear()}`;
    };

    const viewCast = () => {
        if (credits.cast) {
            if (credits.cast.length > 10 && !viewAll) {
                return(
                    <ListGroup>
                        {credits.cast.slice(0, 10)
                            .map(credit =>
                                <ListGroup.Item key={credit.id}>
                                    {credit.name} ... {credit.character}
                                </ListGroup.Item>)}
                    </ListGroup>
                );
            } else {
                return (
                    <ListGroup>
                        {credits.cast
                            .map(credit =>
                                <ListGroup.Item key={credit.id}>
                                    {credit.name} ... {credit.character}
                                </ListGroup.Item>)}
                    </ListGroup>
                );
            }
        } else {
            return <div><Spinner animation="border" size="sm" /></div>;
        }
    };

    const viewAllButton = () => {
        if (viewAll) {
            return (
                <Button onClick={viewOption}>
                    show less
                </Button>
            );
        } else {
            return (
                <Button onClick={viewOption}>
                    show all
                </Button>
            );
        }
    };

    const viewCrew = () => {
        if (credits.crew) {
            return (
                <ListGroup>
                    {credits.crew.slice(0, 20).map(credit =>
                        <ListGroup.Item key={credit.credit_id}>{credit.job} ... {credit.name}</ListGroup.Item>)}
                </ListGroup>
            );
        } else {
            return <div>
                <Spinner animation="border" size="sm" />
            </div>;
        }
    };

    const viewDetails = () => {
        if (details) {
            return (
                <ListGroup>
                    <ListGroup.Item>Release date: {getDate(details.release_date)}</ListGroup.Item>
                    <ListGroup.Item>
                        <ListGroup>
                            <div>Country:</div>
                            {details.production_countries.map(cnt =>
                                <ListGroup.Item key={cnt.name}>{cnt.name}</ListGroup.Item>)}
                        </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <ListGroup>
                            <div>Language:</div>
                            {details.spoken_languages.map(lang =>
                                <ListGroup.Item key={lang.iso_639_1}>{lang.name ? lang.name : lang.iso_639_1}</ListGroup.Item>)}
                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            );
        } else {
            return <div><Spinner animation="border" size="sm" /></div>;
        }
    };

    const viewDescription = () => {
        if (details.overview) {
            return (
                <div>
                    <h5>
                        {details.tagline}
                    </h5>
                    <p>
                        {details.overview}
                    </p>
                    <p>
                        runtime: {details.runtime} minutes
                    </p>
                    <p>
                        more details at <Button href={`https://www.imdb.com/title/${details.imdb_id}`} variant="outline-secondary" size="sm">IMDb</Button>
                    </p>
                </div>
            );
        } else {
            return <div><Spinner animation="border" size="sm" /></div>;
        }
    };

    const viewGenre = () => {
        if (details.genres) {
            return (
                <ListGroup>
                    {details.genres.map(genre => <ListGroup.Item key={genre.id}>{genre.name}</ListGroup.Item>)}
                </ListGroup>
            );
        } else {
            return <div><Spinner animation="border" size="sm" /></div>;
        }
    };

    const viewSimilar = () => {
        if (similarMovies.length > 0) {
            return (
                <ListGroup horizontal>
                    {similarMovies.slice(0,8).map(movie =>
                        <FilmCard className='list-group-item' key={movie.id} movie={movie} cardSize='8rem' showCaption={false} />)}
                </ListGroup>
            );
        }
    };


    const content = () => {
        if (view === 'cast') {
            if (credits.cast && credits.cast.length > 10) {
                return <div>
                    {viewCast()}
                    {viewAllButton()}
                </div>;
            } else {
                return <div>
                    {viewCast()}
                </div>;
            }
        } else if (view === 'crew') {
            return viewCrew();
        } else if (view === 'details') {
            return <div>
                {viewDetails()}
            </div>;
        } else if (view === 'genre') {
            return viewGenre();
        } else if(view === 'similar') {
            return viewSimilar();
        }
    };

    const radios = [
        { name: 'Cast', value: 'cast' },
        { name: 'Crew', value: 'crew' },
        { name: 'Details', value: 'details' },
        { name: 'Genre', value: 'genre' },
        { name: 'Similar', value: 'similar' }
    ];

    const viewHeader = () => {
        if (credits.crew.length !== 0) {
            return (
                <div>
                    <h2>{details.title} ({details.release_date ? details.release_date.split('-')[0] : 'unreleased'})</h2>
                    <div>Directed by {credits.crew.filter(credit => credit.job === 'Director')[0].name}</div>
                    <img src={`http://image.tmdb.org/t/p/w185/${details.poster_path}`} alt="poster"></img>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{details.title} ({details.release_date ? details.release_date.split('-')[0] : 'unreleased'})</h2>
                    <img src={`http://image.tmdb.org/t/p/w185/${details.poster_path}`} alt="poster"></img>
                </div>
            );
        }
    };


    if (details && credits.crew) {
        return (
            <div>
                {viewHeader()}
                {viewDescription()}
                {user ? <div>
                    <DiaryButton id={details.id}
                        title={details.title}
                        poster_path={details.poster_path}
                        release_date={details.release_date}
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}
                        setDiary={setDiary}
                        setNotify={setNotifyMessage} />
                    <WatchlistButton id={details.id}
                        title={details.title}
                        poster_path={details.poster_path}
                        release_date={details.release_date}
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}
                        setNotify={setNotifyMessage}
                        setError={setErrorMessage} />
                </div>
                    :
                    <div>
                        <Button onClick={toLogin} variant="outline-secondary">
                            Log in to review and add to watchlist
                        </Button>
                    </div>
                }
                <ButtonGroup toggle>
                    {radios.map((radio, index) => (
                        <ToggleButton key={index}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={view === radio.value}
                            onChange={toView(radio.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                {content()}
            </div>);

    } else {
        return <div></div>;
    }
};

export default MovieInfo;