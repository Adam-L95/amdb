import React from 'react';
import userService from '../services/user';

const WatchlistButton = ({ id, title, poster_path, release_date, watchlist, setWatchlist }) => {

    const handleAdd = (event) => {
        event.preventDefault();
        const toAdd = {
            id: id,
            title: title,
            poster_path: poster_path,
            release_date: release_date
        };
        console.log(toAdd);
        userService.addToWatchlist(toAdd)
            .then(returnedEntry => {
                console.log(returnedEntry);
                setWatchlist(returnedEntry);
            });



    };
    // console.log(id);
    // console.log(watchlist);
    // console.log(watchlist.filter(entry => entry.movieId === id).length);

    const handleRemove = (event) => {
        event.preventDefault();
        userService.removeFromWatchlist(id).then(retrunedObject => {
            console.log(retrunedObject);
            setWatchlist(retrunedObject.data);
        });
    };

    if (watchlist.filter(entry => entry.movieId === id).length > 0) {
        return (
            <div>
                <button onClick={handleRemove}>
                    remove from watchlist
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={handleAdd}>
                    add to watchlist
                </button>
            </div>
        );
    }
};

export default WatchlistButton;