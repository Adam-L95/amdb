import React from 'react';
import userService from '../services/user';

const DiaryButton = ({ id, title, poster_path, release_date, watchlist, setWatchlist, setDiary }) => {
    const handleLog = (event) => {
        event.preventDefault();
        const toAdd = {
            id: id,
            title: title,
            poster_path: poster_path,
            release_date: release_date
        };
        // if (watchlist.filter(item => item.movieId === id).length > 0) {
        //     userService.removeFromWatchlist(id).then(retrunedObject => {
        //         console.log(retrunedObject);
        //         setWatchlist(retrunedObject.data);
        //     });
        // }

        userService.addToDiary(toAdd).then(retrunedObject => {
            console.log(retrunedObject);
            setDiary(retrunedObject);
            remove();
        });
    };

    const remove = () => {
        userService.removeFromWatchlist(id).then(retrunedObject => {
            console.log(retrunedObject);
            setWatchlist(retrunedObject.data);
        });
    };

    return (
        <div>
            <button onClick={handleLog}>Log film</button>
        </div>
    );
};

export default DiaryButton;