import React, { useState, useEffect } from 'react';
// Components
import Menu from './components/Menu';
import SearchBar from './components/SearchBar';
import SearchDisplay from './components/SearchDisplay';
import MovieInfo from './components/MovieInfo';
import Watchlist from './components/Watchlist';
import Diary from './components/Diary';
import Notification from './components/Notification';
import Error from './components/Error';
import LoginForm from './components/LoginForm';
import CreateUserForm from './components/CreateUserForm';
// Services
import movieService from './services/movies';
import loginService from './services/login';
import userService from './services/user';
import createUserService from './services/createUser';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const App = () => {
    // Logged in user states
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [diary, setDiary] = useState([]);
    // Page states
    const [page, setPage] = useState('home');
    const [movieToView, setMovieToView] = useState(null);
    // Log in/Create user page states. These are reset once the user is logged in
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    // Notification states
    const [errorMessage, setErrorMessage] = useState(null);
    const [notifyMessage, setNotifyMessage] = useState(null);

    useEffect(() => {
        // Takes token from the browser's local storage and logs in user
        const loggedUserJSON = window.localStorage.getItem('loggedMovieAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            movieService.setToken(user.token);
            userService.setToken(user.token);
            setWatchlist(user.watchlist);
            setDiary(user.diary);
        }
    }, []);

    const logUser = (userToLog) => {
        // Sets the user states, log in message, and tokens in services
        window.localStorage.setItem('loggedMovieAppUser', JSON.stringify(userToLog));
        movieService.setToken(userToLog.token);

        userService.setToken(userToLog.token);
        setUser(userToLog);
        setWatchlist(userToLog.watchlist);
        setDiary(userToLog.diary);
        setUsername('');
        setPassword('');
        setPassword2('');
        setName('');
        setPage('home');
        setNotifyMessage(`welcome ${userToLog.name}`);
        setTimeout (() => {
            setNotifyMessage(null);
        }, 5000);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });
            logUser(user);
        } catch (exception) {
            setErrorMessage('Invalid username or password');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

    };

    const handleNewUser = async (event) => {
        event.preventDefault();

        if (password !== password2) {
            // checks if the password and confirmation password are identical
            // resets both when if statement fails
            setErrorMessage('the passwords do not match');
            setPassword('');
            setPassword2('');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        } else {
            try {
                await createUserService.createUser({
                    username, name, password
                });

                const user = await loginService.login({
                    username, password
                });
                logUser(user);
            } catch (exception) {
                setErrorMessage('User already exists');
                console.log(exception.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }

        }

    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('loggedMovieAppUser');
        window.location.reload();
    };

    if (user === null) {
        // if the user is not logged this renders either the user creation or user log in form
        if (page === 'newUser') {
            return (
                <div className="container">
                    <h2>
                        Create an account
                    </h2>
                    <Error message={errorMessage} />
                    <CreateUserForm
                        username={username}
                        password={password}
                        password2={password2}
                        name={name}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handleNameChange={({ target }) => setName(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handlePassword2Change={({ target }) => setPassword2(target.value)}
                        handleSubmit={handleNewUser}
                    />
                    <a href="/#" onClick={() => setPage('home')}>Back to log in</a>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h2>
                        Log in to application
                    </h2>
                    <Error message={errorMessage} />
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <a href="/#" onClick={() => setPage('newUser')}>Create an account</a>
                </div>
            );
        }
    }

    const content = () => {
        /*
            Main Content of the site

            The components are rendered depending on which state 'setPage' is currently in.

            Homepage currently does not show anything as of 9/29/20.

        */
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
                        setWatchlist={setWatchlist}
                        setNotify={setNotifyMessage}/>
                </div>
            );
        } else if (page === 'watchlist') {
            return <Watchlist watchlist={watchlist} setMovieToView={setMovieToView} setPage={setPage} username={username} />;
        } else if (page === 'movie') {
            return <MovieInfo id={movieToView}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                setDiary={setDiary}
                setNotifyMessage={setNotifyMessage}
                setErrorMessage={setErrorMessage}/>;
        } else if (page === 'diary') {
            return <Diary diary={diary} setMovieToView={setMovieToView} setPage={setPage} />;
        }
    };

    // const content = () => {
    //     // if (page === 'home') {
    //     //     return <div>Home Page</div>;
    //     // } else if (page === 'search') {
    //     //     return (
    //     //         <div>
    //     //             <SearchBar setMovies={setMovies} />
    //     //             <SearchDisplay movies={movies}
    //     //                 setPage={setPage}
    //     //                 setMovieToView={setMovieToView}
    //     //                 watchlist={watchlist}
    //     //                 setWatchlist={setWatchlist}
    //     //                 setNotify={setNotifyMessage}/>
    //     //         </div>
    //     //     );
    //     // } else if (page === 'watchlist') {
    //     //     return <Watchlist watchlist={watchlist} setMovieToView={setMovieToView} setPage={setPage} username={username} />;
    //     // } else if (page === 'movie') {
    //     //     return <MovieInfo id={movieToView}
    //     //         watchlist={watchlist}
    //     //         setWatchlist={setWatchlist}
    //     //         setDiary={setDiary}
    //     //         setNotifyMessage={setNotifyMessage}
    //     //         setErrorMessage={setErrorMessage}/>;
    //     // } else if (page === 'diary') {
    //     //     return <Diary diary={diary} setMovieToView={setMovieToView} setPage={setPage} />;
    //     // }

    //     // return (
    //     //     <Switch>
    //     //         <Route path="/search">
    //     //             <div>
    //     //                 <SearchBar setMovies={setMovies} />
    //     //                 <SearchDisplay movies={movies}
    //     //                     setPage={setPage}
    //     //                     setMovieToView={setMovieToView}
    //     //                     watchlist={watchlist}
    //     //                     setWatchlist={setWatchlist}
    //     //                     setNotify={setNotifyMessage}/>
    //     //             </div>
    //     //         </Route>
    //     //         <Route path="/watchlist">
    //     //             <Watchlist watchlist={watchlist} setMovieToView={setMovieToView} setPage={setPage} username={username} />
    //     //         </Route>
    //     //         <Route path="/movie/:id">
    //     //             <MovieInfo
    //     //                 watchlist={watchlist}
    //     //                 setWatchlist={setWatchlist}
    //     //                 setDiary={setDiary}
    //     //                 setNotifyMessage={setNotifyMessage}
    //     //                 setErrorMessage={setErrorMessage}/>
    //     //         </Route>
    //     //         <Route path="/diary">
    //     //             <Diary diary={diary} setMovieToView={setMovieToView} setPage={setPage} />
    //     //         </Route>
    //     //     </Switch>
    //     // );
    // };

    return (
        <div className="container">
            <Menu username={user.username}
                watchlist={watchlist}
                diary={diary}
                setPage={setPage}
                setMovies={setMovies}
                setMovieToView={setMovieToView}
                handleLogout={handleLogout} />
            <Notification message={notifyMessage} />
            <Error message={errorMessage} />
            {content()}
            <footer>
                <em>Adam Lapinski, 2020.
        Film data from <a href="https://www.themoviedb.org/">TMDb</a></em>
            </footer>
        </div>
    );

};

export default App;