import React, { useEffect, useState } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../services/user.service';
import { alertService } from '../services/alert.service';
import { Alert } from './Alert';

function Users({ history }) {

    let { id } = useParams();
    const isAddMode = !id;

    const [user, setUser] = useState({});
    useEffect(() => {
        if (!isAddMode) {
            userService.getById(id).then(user => {
                const fields = ['title', 'body'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        body: Yup.string()
            .required('Body is required'),
    });

    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }
    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }
    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
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
        <div className="container pt-4 pb-4">
        <Alert />
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <h1>{isAddMode ? 'Add User' : `Edit User #${id}`}</h1>
                <div className="form-row">
                    <div className="form-group col-5">
                        <label>Title</label>
                        <input {...register("title")} type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Body</label>
                        <input {...register("body")} type="text" className={`form-control ${errors.body ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.body?.message}</div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                </div>
            </form>
            </div>
        </>
    );
}

export default Users
