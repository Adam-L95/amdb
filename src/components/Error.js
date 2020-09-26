import React from 'react';
import { Alert } from 'react-bootstrap';

const Error = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <Alert variant="danger">
            {message}
        </Alert>
    );
};

export default Error;