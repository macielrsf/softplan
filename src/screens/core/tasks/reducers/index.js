import * as types from '../constants';

const INITIAL_STATE = {
    loading: false,
    tasks: [],
    users: []
}

export default (state = INITIAL_STATE, action) => {
    switch ( action.type ) {
        case types.LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case types.TASKS_LOADED: {
            return {
                ...state,
                tasks: action.payload
            }
        }
        case types.USERS_LOADED: {
            return {
                ...state,
                users: action.payload
            }
        }
        default:
            return state;
    }
}
