import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink exact to="/login" className="nav-item nav-link">Login</NavLink>
                <NavLink to="/users/add" className="nav-item nav-link">Add User</NavLink>
            </div>
        </nav>
    );
}

export default Nav