import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alertService} from '../services/alert.service';

function LoginPage({history}) {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const { register, handleSubmit, reset, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    

    function onSubmit(data) {
        return  createUser(data);
    }

    function createUser(data) {
        if(data.username == "test"){
            alertService.success('Login Successful', { keepAfterRouteChange: true });
            history.push('/home');
        }
        else{
            alertService.error('Invalid Credentials', { keepAfterRouteChange: true });
        }
        
    }


    return (
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
    )
}

export default LoginPage
