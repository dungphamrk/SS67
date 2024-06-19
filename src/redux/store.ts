import { createStore } from "redux";
import {combineReducers} from 'redux'
import { libraryReducer } from "./reducer";
const reducers=combineReducers({libraryReducer});
export const store= createStore(reducers)