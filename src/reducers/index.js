import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer';
import workReduser from "./workReduser";

export default combineReducers({
    user: userReducer,
    form: formReducer,
    work: workReduser,
});
