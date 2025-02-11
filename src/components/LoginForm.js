import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = (props) => {

    return (
        <div>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        value={props.username}
                        name="Username"
                        onChange={props.handleUsernameChange}
                    />

                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={props.password}
                        name="Password"
                        onChange={props.handlePasswordChange}
                    />
                    <Button variant="primary" id="login-button" type="submit">login</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginForm;