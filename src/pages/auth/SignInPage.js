import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/actions/authActions'
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInPage() {
    const classes = useStyles();
    const {loading, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value.trim();

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

        if (trimmedEmail && trimmedPassword && isValidEmail(trimmedEmail) && trimmedPassword.length >= 6) {
            dispatch(login(trimmedEmail, trimmedPassword));
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
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        error={!!email.error}
                        helperText={email.error}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email.value}
                        onChange={(e) => setEmail({value: e.target.value, error: ''})}
                    />
                    <TextField
                        error={!!password.error}
                        helperText={password.error}
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading ? (
                            <CircularProgress size={20} color="secondary"/>
                        ) : 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}