import {
    FETCH_TASKS,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILED,
    CREATE_TASK,
    EDIT_TASK,
    CREATE_TASK_SUCCESS,
    EDIT_TASK_SUCCESS,
    HIDE_TASK_MODAL,
    SUBMIT_TASK_FORM,
    SUBMIT_TASK_FORM_ERROR,
    TOGGLE_TASK_STATUS_SUCCESS
} from "../types";

const INITIAL_STATE = {
    data: [],
    loading: false,
    currentPage: 1,
    total: 0,
    perPage: 10,
    error: '',
    submitError: '',
    task: null,
    modalVisible: false,
    formLoading: false,
};

export function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TASKS:
            return {...state, loading: true, error: ''};
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                data: action.payload.data,
                total: action.payload.total,
                currentPage: action.payload.current_page,
                perPage: action.payload.per_page
            };
        case FETCH_TASKS_FAILED:
            return {...state, loading: false, error: action.payload};
        case CREATE_TASK:
            return {...state, task: null, modalVisible: true};
        case HIDE_TASK_MODAL:
            return {...state, task: null, modalVisible: false};
        case EDIT_TASK:
            return {...state, task: action.payload, modalVisible: true};
        case SUBMIT_TASK_FORM:
            return {...state, formLoading: true};
        case SUBMIT_TASK_FORM_ERROR:
            return {...state, formLoading: false, submitError: action.payload};
        case CREATE_TASK_SUCCESS:
        case EDIT_TASK_SUCCESS:
            return {...state, task: null, modalVisible: false, formLoading: false};
        case TOGGLE_TASK_STATUS_SUCCESS:
            const taskId = action.payload;
            const tasks = state.data;
            const newArray = tasks.map(task => {
                if (task.id === taskId) {
                    task.completed = task.completed ? 0 : 1;
                }
                return task;
            });
            return {...state, data: newArray};
        default:
            return state;
    }
}

export default tasksReducer;