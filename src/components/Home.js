import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Alert } from './Alert';

import { userService } from '../services/user.service';
import { alertService } from '../services/alert.service';

function Home() {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
            alertService.warn('User deleted', { keepAfterRouteChange: true });
        });
    }

    return (
        <>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink exact to="/login" className="nav-item nav-link">Logout</NavLink>
                <NavLink to="/users/add" className="nav-item nav-link">Add User</NavLink>
            </div>
        </nav>
        <Alert />
        <div className="container pt-4 pb-4">
        <div>
            <h1>Users</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '25%' }}>Id</th>
                        <th style={{ width: '25%' }}>Title</th>
                        <th style={{ width: '40%' }}>Body</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.title}</td>
                            <td>{user.body}</td>

                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
}

export default Home
