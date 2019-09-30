import React, {useState} from "react"
import { connect } from "react-redux"
import {addIdea,setRequestError} from "../actions";
import {makeHTTPRequest,} from "../helpers/makeHTTPRequest";
import { URL} from "../constants/system";

const MapDispatchToProps = (dispatch) => {
    return {addIdea: (initialData) => dispatch(addIdea(initialData)),
        setRequestError: (error, errorMessage) => dispatch(setRequestError(error, errorMessage))
    }
}

const AddNewIdeaLayout = ({addIdea,setRequestError}) => {
    const  [loading, setLoading] = useState(false)
    return (
            <button
                className="rounded btn btn-danger"
                disabled={loading}
            onClick={()=>{
                setLoading(true)
                makeHTTPRequest(`${URL}new`, "GET")
                    .then(result =>{
                        setLoading(false)
                        if(result.success){addIdea({id: result.data.id, created_date: result.data.created_date})}
                        else {setRequestError({error: true,errorMessage: result.error})}
                    })
                }}
            >Add new Idea</button>
    )
}

export const AddNewIdea = connect(null,MapDispatchToProps)(AddNewIdeaLayout)