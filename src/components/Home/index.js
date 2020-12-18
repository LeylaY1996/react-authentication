import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import FirebaseContext from '../Firebase';

const Home = () => (
    <div>
        <h1>SignUp</h1>
    </div>
);

export default Home;