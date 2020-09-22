import React from 'react';

const Diary = ({ diary , setMovieToView, setPage }) => {
    const displayPoster = (posterSource) => {
        if (posterSource) {
            return <img src={`http://image.tmdb.org/t/p/w92/${posterSource}`} alt={'poster'}/>;
        }
    };

    const toMovie = (a) => (event) => {
        event.preventDefault();
        setMovieToView(a.movieId);
        setPage('movie');
    };

    // const logged_date = Date(item.dateLogged).toString().split(' ');

    const getDate = (date) => {
        return Date(date).toString().split(' ');
    };

    return (
        <div>
            <ul>
                {diary.sort((a, b) => new Date(b.dateLogged) - new Date(a.dateLogged)).map(item =>
                    <li key ={item._id}>
                        <p>Watched: {`${getDate(item.dateLogged)[1]} ${getDate(item.dateLogged)[2]} ${getDate(item.dateLogged)[3]}`}</p>
                        <a href="/#" onClick={toMovie(item)} >
                            {displayPoster(item.posterPath)}
                            <h3>{item.title} ({item.releaseDate ? item.releaseDate.split('-')[0] : 'unreleased'}) </h3>
                        </a>
                    </li>
                )
                }
            </ul>
        </div>
    );
};

export default Diary;