import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateUserForm = (props) => {

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
                    <Form.Label>name:</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        value={props.name}
                        name="Name"
                        onChange={props.handleNameChange}
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={props.password}
                        name="Password"
                        onChange={props.handlePasswordChange}
                    />
                    <Form.Label>confirm password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password2"
                        value={props.password2}
                        name="Password2"
                        onChange={props.handlePassword2Change}
                    />
                    <Button variant="primary" id="login-button" type="submit">Create Account</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default CreateUserForm;