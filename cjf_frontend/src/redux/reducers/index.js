import { combineReducers } from "redux";
import { auth } from "./auth";
import { mocks } from './mocks';
import { globalVariables } from './global';

export default combineReducers({
    auth,
    mocks,
    globalVariables
});