import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./reducer"

const store = configureStore({
    reducer : rootReducer
});

const {dispatch} = store;
console.log(store)
export {store,dispatch};