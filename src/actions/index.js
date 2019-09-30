import {ADD_IDEA, EDIT_IDEA, DELETE_IDEA,SORT_IDEAS, LOAD_IDEAS_FROM_SERVER, SET_REQUEST_ERROR,SET_UPDATE_SUCCESS} from "../constants/actions";

export const addIdea = (payload) => {
    return {type: ADD_IDEA, payload}}

export  const editIdea = (payload) => {
    return {type: EDIT_IDEA, payload }
}
export const deleteIdea = (payload) => {
    return {type: DELETE_IDEA, payload}
}

export const sortIdeas = (payload) => {
    return {type: SORT_IDEAS, payload}
}
export const loadIdeasFromServer = (payload) => {
    return {type: LOAD_IDEAS_FROM_SERVER, payload}
}
export const setRequestError = (payload) => {
    return {type: SET_REQUEST_ERROR, payload}
}
export const  setUpdateSuccess = (payload) => {
    return {type:SET_UPDATE_SUCCESS, payload}
}