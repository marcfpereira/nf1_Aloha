import React, { useState, useEffect } from 'react';

import './LogIn.css';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from "@material-ui/core/Link";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState('');
    const [error, setError] = useState('');

    const data = {
        email: email,
        password: password
    }

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleOnSubmit = () => {
        const fetchdata = async () => {
            const url = "http://127.0.0.1:80/api/auth/login";
            const options = {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: 'cors'

            }

            fetch(url, options)

                .then(response => {
                    if (response.status === 401) {
                        response.json().then((resp => {
                            return setError(resp.errors);
                            return Promise.reject(alert(resp.errors))
                        }))
                    } else if (response.status === 200) {
                        response.json().then((resp => {
                             //console.warn("resp",resp);
                            setError('');
                            return Promise.reject(alert(`Bienvenido ${resp.access_token[1]} :)`))

                        }))

                    }
                }).catch(error => {
                setError(error);
                alert(error);// Este catch nos ejecuta algo cuándo no hay respuesta

            });

        };

        fetchdata()
    }

    return (
        <Container component="main" maxWidth="xs">

            <div>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} align={"center"} className={"h1login"}>
                            Inicia Sesión
                            <hr></hr>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Dirección de correo electrónico"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <AccountCircle/>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                label="Contraseña"
                                required
                                fullWidth
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                autoComplete="current-password"
                                onChange={event => setPassword(event.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            size={"small"}
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                                variant="outlined"
                            />


                        </Grid>
                        <Grid item xs={12} >
                            <p className={"error"}> {error} </p>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                type="checkbox"
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="Recordarme"
                                name="Remember"
                                value={remember}
                                onChange={event => setRemember(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                </form>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    text-transform="none"
                    color="secondary"
                    size="medium"
                    className={'botonlogin'}
                    onClick={handleOnSubmit}
                >
                    Inicia Sesión
                </Button>

                <Grid container justify="flex-start" className={"fatherLink"}>
                    <Grid item>
                        <span>¿No tienes cuenta ? </span>

                        <Link href="#" variant="body2" className={"link"}>
                            Regístrate
                        </Link>

                    </Grid>
                </Grid>

            </div>

        </Container>
    );
}