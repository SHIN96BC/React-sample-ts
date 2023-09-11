import {AnyAction, CombinedState, combineReducers, configureStore, EmptyObject, Reducer} from "@reduxjs/toolkit";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import authSlice from "./slices/authSlice";

const reducers = combineReducers({
    auth: authSlice
});

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        // state에 function을 사용하기 위해 선언
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
