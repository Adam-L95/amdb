import React, { useEffect, useState, useParams } from 'react';
import WatchlistButton from './WatchlistButton';
import DiaryButton from './DiaryButton';
import movieService from '../services/movies';
import { Button, ButtonGroup, ToggleButton, ListGroup, Spinner } from 'react-bootstrap';

const MovieInfo = ({ id, watchlist, setWatchlist, setDiary, setNotifyMessage, setErrorMessage }) => {
    const [details, setDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [view, setView] = useState('cast');
    const [viewAll, setViewAll] = useState(false);

    // const Mid = useParams().id;
    // console.log(Mid);
    // const id = Number(Mid);

    useEffect(() => {
        movieService.getSelected(id).then(detail => {
            // console.log(detail);
            setDetails(detail);});
        movieService.getCredits(id).then(credit => {
            // console.log(credit);
            setCredits(credit);});
    }, [id]);

    const toView = (page) => (event) => {
        event.preventDefault();
        setViewAll(false);
        setView(page);
    };

    const viewOption = (event) => {
        event.preventDefault();
        setViewAll(!viewAll);
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
                    {/* <ListGroup.Item>
                        Director ... {credits.crew.filter(credit => credit.job === 'Director')[0].name}
                    </ListGroup.Item> */}
                    {/* <li>Writer - {credits.crew.filter(credit => credit.job === 'Screenplay')[0].name}</li> */}
                    {/* <li>Editor - {credits.crew.filter(credit => credit.job === 'Editor')[0].name}</li> */}
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
                    {/* <ListGroup.Item>{details.overview}</ListGroup.Item> */}
                    <ListGroup.Item>Release date: {details.release_date}</ListGroup.Item>
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
        }
    };

    const radios = [
        { name: 'Cast', value: 'cast' },
        { name: 'Crew', value: 'crew' },
        { name: 'Details', value: 'details' },
        { name: 'Genre', value: 'genre' }
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
                <ButtonGroup toggle>
                    {/* <Button variant="secondary" onClick={toView('cast')}>Cast</Button>
                    <Button variant="secondary" onClick={toView('crew')}>Crew</Button>
                    <Button variant="secondary" onClick={toView('details')}>Details</Button>
                    <Button variant="secondary" onClick={toView('genre')}>Genre</Button> */}
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