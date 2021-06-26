import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alertService } from '../services/alert.service';
import { useHistory } from 'react-router-dom'
import { authenticationService } from '../services/authentication.service';
import { Alert } from './Alert';




function LoginPage() {

    const history = useHistory()
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const { register, handleSubmit, reset, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        authenticationService.logout();
    }, []);

    function onSubmit(data) {
        return authenticationService.login(data.username, data.password).then(
            user => {
                alertService.success('Login Successful', { keepAfterRouteChange: true });
                history.push('/home');
            },
            error => {
                alertService.error(error);
            }
        );
    }
    return (
        <>
            <Alert />
            <div className="container mt-5 pt-5 pb-4">

                <div className="Jumbotron">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Username</label>
                            <input {...register("username")} defaultValue="test" type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group col-5">
                            <label>Password</label>
                            <input {...register("password")} defaultValue="test" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage
