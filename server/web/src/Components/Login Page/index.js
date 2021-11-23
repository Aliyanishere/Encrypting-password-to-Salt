import React, { useContext } from 'react';
import './app.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import baseUrl from "../../assests/BaseUrl/index";
import NavBar from '../NavBar/index';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '../../assests/Context api/Context';

const Login = () => {

    const { dispatch } = useContext(GlobalContext);
    let navigate = useNavigate();

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '40ch',
            },
        },
    }));

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email("Please enter valid email")
                .required("Please enter this feild"),
            password: Yup
                .string()
                .min(8, "Password must be 8 digits long")
                .required("Please enter this feild")
        }),
        onSubmit: (values) => {
            // console.log("submit click=>", values);
            axios.post(`${baseUrl}/api/v1/login`, {
                email: values.email,
                password: values.password
            })
                .then((res) => {
                    console.log(res.data);
                    setResponse(res.data.msg);
                    setOpen(true);
                        if (res.data.data) {
                            setTimeout(() => {
                                navigate("/");
                                dispatch({
                                    type: "USER_LOGIN",
                                    payload: {
                                        userEmail: values.email,
                                        theme: true
                                    }
                                })
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.log("data nahi gaya server per", err)
                })
        }
    })

    const [open, setOpen] = React.useState(false);
    const [response, setResponse] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                ❌
            </Button>
        </React.Fragment>
    );


    return (
        <div className="login">
            <NavBar />
            <h1>Login</h1>
            <br />
            <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField
                    type="email"
                    color="secondary"
                    label="Email"
                    name="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /><br />
                <TextField
                    type="password"
                    color="secondary"
                    label="Password"
                    name="password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                /><br />
                <Button id="submitBtn" type="submit" variant="contained" color="secondary">
                    Login
                </Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={response}
                action={action}
            />
        </div>
    )
}

export default Login;