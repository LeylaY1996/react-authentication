import React from 'react';
import AccountPage from '../Account';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <div>
        <h1>Home</h1>
    </div>
);

//giriş yapmamış kullanıcı homepage sayfasına erişemeyecek
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);