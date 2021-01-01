import React, { Component } from 'react';

import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: []
        };
    }

    componentDidMount() {
    console.log("users",this.state.users);

        this.setState({loading: true});

        //veritabanında kullanıcıları çekebiliriz.

        console.log("hello",this.props.firebase.users())
        this.props.firebase.users().on('value', snapshot => {

            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key
            }))
            this.setState({
                users: usersList,
                loading:false,
            })
        })
    }

    componentWillUnmount() {
        /*  bellek kullanımını meşgul etmemek için users verilerin ggelmesini kapatıyoruz */
        this.props.firebase.users().off();
    }
    render() { 
        const { users, loading } = this.state;
        return (

            <div>
                <h1>Admin</h1>
                {loading && <div>Loading...</div>}
                <UserList users = { users }/>
            </div>
        )
    }

}

const UserList = ({users}) => (
    <ul>
        <p>User: {users}</p>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> { user.id }
                </span>
                <span>
                    <strong>EMail:</strong> { user.email }
                </span>
                <span>
                    <strong>Username:</strong> { user.username }
                </span>
            </li>
        ))}
    </ul>
)

export default withFirebase(AdminPage);
