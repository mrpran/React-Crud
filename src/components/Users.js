import React, { useEffect, useState } from 'react';
import { Link , Redirect} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../services/user.service';
import { alertService} from '../services/alert.service';

function Users({history, match}) {

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
        console.log(data);
        createUser(data);
    }
    function createUser(data) {
        return userService.create(data)
        .then(() => {
            alertService.success('User added', { keepAfterRouteChange: true });
            history.push('.');
        })
        .catch(alertService.error);
    }

    const [user, setUser] = useState({});
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Title</label>
                    <input {...register("title")}type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
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
            </div>
        </form>
    );
}

export default Users
