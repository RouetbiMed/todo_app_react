import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {register} from '../../redux/actions/authActions'

import Copyright from '../../components/Copyright';
import {isValidEmail} from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpPage() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [name, setName] = useState({value: '', error: ''});
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [passwordConfirmation, setPasswordConfirmation] = useState({value: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.value.trim();
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value.trim();
        const trimmedPasswordConfirmation = passwordConfirmation.value.trim();

        if (trimmedName === '') {
            setName({...name, error: 'Name is required'});
        }

        if (trimmedEmail === '') {
            setEmail({...email, error: 'Email is required'});
        }

        if (trimmedPassword === '') {
            setPassword({...password, error: 'Password is required'});
        }


        if (trimmedEmail && !isValidEmail(trimmedEmail)) {
            setEmail({...email, error: 'Email need to be a valid email'});
        }

        if (trimmedPassword && trimmedPassword.length < 6) {
            setPassword({...password, error: 'Password need to be 6 characters as least'});
        }

        if (trimmedPasswordConfirmation === '') {
            setPasswordConfirmation({...passwordConfirmation, error: 'Password confirmation is required'});
        }

        if (trimmedPasswordConfirmation && trimmedPassword && trimmedPassword.length >= 6 && trimmedPassword !== trimmedPasswordConfirmation) {
            setPasswordConfirmation({...passwordConfirmation, error: 'Password & Password confirmation are different'});
        }

        if (trimmedName && trimmedEmail && trimmedPassword && trimmedPasswordConfirmation && trimmedPassword && trimmedPassword.length >= 6 && trimmedPassword === trimmedPasswordConfirmation) {
            dispatch(register(trimmedName, trimmedEmail, trimmedPassword, trimmedPasswordConfirmation));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!name.error}
                                helperText={name.error}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                value={name.value}
                                onChange={(e) => setName({value: e.target.value, error: ''})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!!email.error}
                                helperText={email.error}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email.value}
                                onChange={(e) => setEmail({value: e.target.value, error: ''})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!!password.error}
                                helperText={password.error}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password.value}
                                onChange={(e) => setPassword({value: e.target.value, error: ''})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!!passwordConfirmation.error}
                                helperText={passwordConfirmation.error}
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Password confirmation"
                                type="password"
                                id="password_confirmation"
                                autoComplete="password-confirmation"
                                value={passwordConfirmation.value}
                                onChange={(e) => setPasswordConfirmation({value: e.target.value, error: ''})}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
