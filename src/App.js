import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import SearchBar from './components/SearchBar';
import SearchDisplay from './components/SearchDisplay';
import MovieInfo from './components/MovieInfo';
import Watchlist from './components/Watchlist';
import Diary from './components/Diary';
import movieService from './services/movies';
import loginService from './services/login';
import userService from './services/user';
import LoginForm from './components/LoginForm';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [diary, setDiary] = useState([]);
    const [page, setPage] = useState('home');
    const [movieToView, setMovieToView] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem('loggedMovieAppUser', JSON.stringify(user));
            movieService.setToken(user.token);

            userService.setToken(user.token);

            console.log(user);

            setUser(user);
            setWatchlist(user.watchlist);
            // console.log(user.watchlist);
            // console.log(watchlist);
            // console.log(user.watchlist.filter(entry => entry.movieId === 346));
            setDiary(user.diary);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log(exception);
        }

    };


    if (user === null) {
        return (
            <div>
                <h2>
                    Log in to application
                </h2>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </div>
        );
    }

    const content = () => {
        if (page === 'home') {
            return <div>Home Page</div>;
        } else if (page === 'search') {
            return (
                <div>
                    <SearchBar setMovies={setMovies} />
                    <SearchDisplay movies={movies}
                        setPage={setPage}
                        setMovieToView={setMovieToView}
                        watchlist={watchlist}
                        setWatchlist={setWatchlist}/>
                </div>
            );
        } else if (page === 'watchlist') {
            return <Watchlist watchlist={watchlist} setMovieToView={setMovieToView} setPage={setPage} />;
        } else if (page === 'movie') {
            return <MovieInfo id={movieToView} watchlist={watchlist} setWatchlist={setWatchlist} setDiary={setDiary} />;
        } else if (page === 'diary') {
            return <Diary diary={diary} setMovieToView={setMovieToView} setPage={setPage} />;
        }
    };

    return (
        <div>
            <h1>AMDb</h1>
            <Menu username={user.username}
                watchlist={watchlist}
                diary={diary}
                setPage={setPage}
                setMovies={setMovies}
                setMovieToView={setMovieToView} />
            {content()}
            <footer>
                <em>Adam Lapinski, 2020.
        Film data from <a href="https://www.themoviedb.org/">TMDb</a></em>
            </footer>
        </div>
    );

};

export default App;