import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import SearchBar from './components/SearchBar';
import SearchDisplay from './components/SearchDisplay';
import MovieInfo from './components/MovieInfo';
import movieService from './services/movies';
import loginService from './services/login';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [wlIds, setwlIds] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState('home');
    const [movieToView, setMovieToView] = useState(null);

    // useEffect(() => {
    //   movieService.getAll().then(movies => setMovies(movies));

    // }, []);

    // useEffect(() => {
    //   loginService.login().then(user => setUser(user));
    // }, []);

    // useEffect(() => {
    //   if (user && movies) {
    //     const watchlistIds = user.watchlist.map(movie => movie.id);
    //     const wl = movies.filter(movie => watchlistIds.includes(movie.id));
    //     setwlIds(watchlistIds);
    //     setWatchlist(wl);
    //   }
    // }, [user, movies]);


    // if (user === null) {
    //   return (
    //     <div>
    //       <h2>
    //         log in to application
    //       </h2>
    //     </div>
    //   );
    // }

    const content = () => {
        if (page === 'home') {
            return <div>Home Page</div>;
        } else if (page === 'search') {
            return (
                <div>
                    <SearchBar setMovies={setMovies} />
                    <SearchDisplay movies={movies} setPage={setPage} setMovieToView={setMovieToView} />
                </div>
            );
        } else if (page === 'watchlist') {
            return <div></div>;
        } else if (page === 'movie') {
            return <MovieInfo id={movieToView} />;
        }
    };

    return (
        <div>
            <h1>AMDb</h1>
            <Menu username={'root'} watchlist={watchlist} setPage={setPage} setMovies={setMovies} setMovieToView={setMovieToView} />
            {content()}
            <footer>
                <em>Adam Lapinski, 2020.
        Film data from <a href="https://www.themoviedb.org/">TMDb</a></em>
            </footer>
        </div>
    );

};

export default App;