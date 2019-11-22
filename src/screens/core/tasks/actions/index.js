import * as types from '../constants';
import http from '~/services/http';

export const load = () => {
    return dispatch => {
        dispatch({
            type: types.LOADING,
            payload: true
        });

        let url = `${http.defaults.baseURL}todos`;

        http.get(url)
            .then(res => {
                if ( res.data && res.data.length > 0 ) {
                    dispatch( {
                        type: types.TASKS_LOADED,
                        payload: res.data
                    });

                    dispatch(loadUsers());
                }
                else {
                    dispatch({
                        type: types.LOADING,
                        payload: false
                    });
                }
            })
            .catch(err => {
                console.warn(err);
                dispatch({
                    type: types.LOADING,
                    payload: false
                });
            });
    }
}

const loadUsers = () => {
    return dispatch => {
        dispatch({
            type: types.LOADING,
            payload: true
        });

        let url = `${http.defaults.baseURL}users`;

        http.get(url)
            .then(res => {
                if ( res.data && res.data.length > 0 ) {
                    dispatch( {
                        type: types.USERS_LOADED,
                        payload: res.data
                    });
                }

                dispatch({
                    type: types.LOADING,
                    payload: false
                });
            })
            .catch(err => {
                console.warn(err);
                dispatch({
                    type: types.LOADING,
                    payload: false
                });
            });
    }
}
