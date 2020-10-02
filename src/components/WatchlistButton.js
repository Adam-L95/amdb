import React from 'react';
import userService from '../services/user';
import { Button } from 'react-bootstrap';

const WatchlistButton = ({ id, title, poster_path, release_date, watchlist, setWatchlist, setNotify, setError }) => {

    const handleAdd = (event) => {
        event.preventDefault();
        const toAdd = {
            id: id,
            title: title,
            poster_path: poster_path,
            release_date: release_date
        };
        // console.log(toAdd);
        setNotify(`'${title}' added to watchlist`);
        setTimeout(() => {
            setNotify(null);
        }, 3000);
        userService.addToWatchlist(toAdd)
            .then(returnedEntry => {
                // console.log(returnedEntry);
                setWatchlist(returnedEntry);
            });



    };
    const handleRemove = (event) => {
        event.preventDefault();
        setError(`'${title}' has been removed from your watchlist`);
        setTimeout(() => {
            setError(null);
        }, 3000);
        userService.removeFromWatchlist(id).then(retrunedObject => {
            // console.log(retrunedObject);
            setWatchlist(retrunedObject.data);
        });
    };

    if (watchlist.filter(entry => entry.movieId === id).length > 0) {
        return (
            <div>
                <Button variant="outline-danger" onClick={handleRemove}>
                    remove from watchlist
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <Button variant="outline-primary" onClick={handleAdd}>
                    add to watchlist
                </Button >
            </div>
        );
    }
};

export default WatchlistButton;