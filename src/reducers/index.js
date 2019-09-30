import {ADD_IDEA, EDIT_IDEA,DELETE_IDEA,SORT_IDEAS,LOAD_IDEAS_FROM_SERVER, SET_REQUEST_ERROR, SET_UPDATE_SUCCESS} from "../constants/actions";

const initialState = {
    ideas: [],
    serviceData: {
        sortBy: null,
        errorInfo : {
            error: false,
            errorMessage: "error text"
        },
        updateSuccess: false,
        loading: false
    }
}

export const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_IDEAS_FROM_SERVER:
            return {...state, ideas: action.payload}
        case ADD_IDEA:
            return {...state, ideas: [...state.ideas, action.payload]}
        case EDIT_IDEA:
            return {...state, serviceData: {...state.serviceData, updateSuccess: true}, ideas: state.ideas.map(idea => { return idea.id===action.payload.id? {...idea, [action.payload.type]:action.payload.value}: idea})}
        case DELETE_IDEA:
            return {...state, ideas: state.ideas.filter((idea) => idea.id !== action.payload)}
        case SORT_IDEAS:
            return {...state, serviceData: {...state.serviceData, sortBy: action.payload}}
        case SET_REQUEST_ERROR:
            return {...state, serviceData:{...state.serviceData, errorInfo: {...state.serviceData.errorInfo, error: action.payload.error, errorMessage: action.payload.errorMessage}}}
        case SET_UPDATE_SUCCESS:
            return {...state, serviceData: {...state.serviceData, updateSuccess: false}}
        default:
            return state

    }
}