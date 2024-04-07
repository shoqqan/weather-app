import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from "redux-thunk";
import {appReducer} from "./reducers/appReducer.ts";

export type AppStateType = ReturnType<typeof rootReducers>
const rootReducers = combineReducers({
    appReducer
})
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))