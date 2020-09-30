import React from 'react';
import userService from '../services/user';
import { Button } from 'react-bootstrap';

const DiaryButton = ({ id, title, poster_path, release_date, setWatchlist, setDiary, setNotify }) => {
    const handleLog = (event) => {
        event.preventDefault();
        const toAdd = {
            id: id,
            title: title,
            poster_path: poster_path,
            release_date: release_date
        };

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
            <Button variant="success" onClick={handleLog}>Log film</Button>
        </div>
    );
};

export default DiaryButton;