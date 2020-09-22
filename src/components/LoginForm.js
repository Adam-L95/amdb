import React from 'react';

const LoginForm = (props) => {

    return (
        <div>
            <h2>
                Login
            </h2>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="username"
                        value={props.username}
                        name="Username"
                        onChange={props.handleUsernameChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={props.password}
                        name="Password"
                        onChange={props.handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;