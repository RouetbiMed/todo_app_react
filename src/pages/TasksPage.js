import React, {useEffect, useMemo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DataTable from "react-data-table-component";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../redux/actions/authActions';
import {fetchTasks, createTask, updateTask, deleteTask, toggleTaskStatus} from '../redux/actions/tasksActions';
import FormDialog from "../components/FormDialog";
import {CREATE_TASK, EDIT_TASK, HIDE_TASK_MODAL} from "../redux/types";
import SwitchControl from "../components/SwitchControl";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    pageContent: {
        padding: theme.spacing(8, 0, 6),
    },
    switchLabel: {
        fontSize: '12px'
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));


export default function TasksPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {loading, data, total, currentPage, modalVisible, task, perPage} = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSubmit = (name, description, id, status, page, perPage, _callback) => {
        if (!!id) {
            dispatch(updateTask(id, name, description, status, page, perPage));
        } else {
            dispatch(createTask(name, description, _callback));
        }
    };

    const handleSwitchChange = (taskId, _callback) => {
        dispatch(toggleTaskStatus(taskId, _callback));
    };

    const columns = useMemo(() => {
        return [
            {
                name: "Name",
                selector: "name",
                sortable: false
            },
            {
                name: "Description",
                selector: "description",
                sortable: false
            },
            {
                name: "Actions",
                sortable: false,
                cell: row => (
                    <div>
                        <SwitchControl row={row} checked={!!row.completed} onChange={handleSwitchChange}/>
                        <IconButton
                            onClick={() => dispatch({type: EDIT_TASK, payload: row})}
                            color="primary"
                            aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(deleteTask(row.id, currentPage, perPage))}
                            color="secondary"
                            aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                )
            }
        ]
    }, [currentPage, perPage]);

    const handlePageChange = page => {
        dispatch(fetchTasks(page, perPage));
    };

    const handlePerRowsChange = (newPerPage, page) => {
        dispatch(fetchTasks(page, newPerPage));
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}> </Typography>
                    <Button onClick={handleLogout} color="primary" variant="outlined" className={classes.link}>
                        Login out
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" component="main" className={classes.pageContent}>
                <Box className={classes.boxContainer} xs={12}>
                    <Button color="primary" onClick={() => {
                        dispatch({type: CREATE_TASK})
                    }} className={classes.link}>
                        Create
                    </Button>
                </Box>
                <DataTable
                    title="Tasks"
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={total}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                />
            </Container>

            <FormDialog
                open={modalVisible}
                task={task}
                handleClose={() => dispatch({type: HIDE_TASK_MODAL})}
                handleSubmit={handleSubmit}
            />
        </React.Fragment>
    );
}
