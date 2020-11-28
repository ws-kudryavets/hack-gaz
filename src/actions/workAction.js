import { instance } from '../utils/axios';
import {
    SET_ACTIVE, SET_ACTIVE_STEPS, QUERY, SET_ACTIVE_CLIENT, GO_TO_STEPS, NEW_VACANCY
} from './types';

export const setActive = (id) => async (dispatch) => {
    dispatch({ type: SET_ACTIVE,
        payload: id });
};

export const setActiveSteps = (id) => async (dispatch) => {
    dispatch({ type: SET_ACTIVE_STEPS,
        payload: id });
};

export const setQuery = (value) => dispatch => {
    dispatch({ type: QUERY,
        payload: value });
}

export const setActiveClient = (value) => dispatch => {
    dispatch({ type: SET_ACTIVE_CLIENT,
        payload: value });
}

export const goToSteps = (id, value) => dispatch => {
    dispatch({ type: GO_TO_STEPS,
        payload: {id, step: value }}
        );
}
export const newVacancy = (data) => dispatch => {
    dispatch({ type: NEW_VACANCY,
        payload: data}
        );
}
