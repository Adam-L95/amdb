import React, { useEffect, useState } from 'react';
import WatchlistButton from './WatchlistButton';
import DiaryButton from './DiaryButton';
import movieService from '../services/movies';

const MovieInfo = ({ id, watchlist, setWatchlist, setDiary }) => {
    const [details, setDetails] = useState({});
    const [credits, setCredits] = useState({});
    const [view, setView] = useState('cast');

    useEffect(() => {
        movieService.getSelected(id).then(detail => setDetails(detail));
        movieService.getCredits(id).then(credit => setCredits(credit));
    }, [id]);

    const toView = (page) => (event) => {
        event.preventDefault();
        setView(page);
    };

    const viewCast = () => {
        if (credits.cast) {
            return (
                <div>
                    <ul>
                        {credits.cast.map(credit => <li key={credit.id}>{credit.name} - {credit.character}</li>)}
                    </ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    const viewCrew = () => {
        if (credits.crew) {
            return (
                <div>
                    <ul>
                        <li>Director - {credits.crew.filter(credit => credit.job === 'Director')[0].name}</li>
                        {/* <li>Writer - {credits.crew.filter(credit => credit.job === 'Screenplay')[0].name}</li> */}
                        {/* <li>Editor - {credits.crew.filter(credit => credit.job === 'Editor')[0].name}</li> */}
                    </ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    const viewDetails = () => {
        if (details.overview) {
            return (
                <div>
                    <p>
                        {details.overview}
                    </p>
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    const viewGenre = () => {
        if (details.genres) {
            return (
                <div>
                    <ul>
                        {details.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                    </ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    };


    const content = () => {
        if (view === 'cast') {
            return viewCast();
        } else if (view === 'crew') {
            return viewCrew();
        } else if (view === 'details') {
            return viewDetails();
        } else if (view === 'genre') {
            return viewGenre();
        }
    };
    return (
        <div>
            <div>
                <h2>{details.title}</h2>
                <img src={`http://image.tmdb.org/t/p/w185/${details.poster_path}`} alt="poster"></img>
            </div>
            <DiaryButton id={details.id} title={details.title} poster_path={details.poster_path} release_date={details.release_date} watchlist={watchlist} setWatchlist={setWatchlist} setDiary={setDiary} />
            <WatchlistButton id={details.id} title={details.title} poster_path={details.poster_path} release_date={details.release_date} watchlist={watchlist} setWatchlist={setWatchlist} />
            <div>
                <button onClick={toView('cast')}>Cast</button>
                <button onClick={toView('crew')}>Crew</button>
                <button onClick={toView('details')}>Details</button>
                <button onClick={toView('genre')}>Genre</button>
            </div>
            {content()}
        </div>);
};

export default MovieInfo;