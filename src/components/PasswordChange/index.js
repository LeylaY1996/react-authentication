import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { CssBaseline, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    password: '',
    confirmPassword: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
    }

    onSubmit = event => {
        const { password } = this.state;

        this.props.firebase 
            .doPasswordUpdate(password)
            .then(() => {
                this.setState({ ...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { password,confirmPassword,error } = this.state;

        const isInvalid = password !== confirmPassword || password === '';

        const style = {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          };
        return (
            /* <form onSubmit={this.onSubmit}>
                <input 
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"/>

                <input 
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                    />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p>{error.message}</p>}
            </form> */


<Container component="main" maxWidth="xs" >

<CssBaseline />

<div>

<form onSubmit={this.onSubmit}>
    <TextField variant="outlined" margin="normal" name="password" value={password} fullWidth onChange={this.onChange} type={password} label="New Password" />
    <TextField variant="outlined" margin="normal" name="confirmPassword" value={confirmPassword} fullWidth onChange={this.onChange} type={password} label="Confirm Password" />

    <Button type="submit" disabled={isInvalid} style={style} variant="contained">
    Change Password
    </Button>
    <Box mt={8}>
    {error && <p>{error.message}</p>}
    </Box>
</form>
</div>
</Container>
        );
    }
}

export default withFirebase(PasswordChangeForm);