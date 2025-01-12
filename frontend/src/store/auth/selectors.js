import { NAME } from "./constants";

export const getToken = (state) => state.persistedReducer.auth.token;
export const getUser = (state) =>  state.persistedReducer.auth.user;
export const getError = (state) => state[NAME].error;
