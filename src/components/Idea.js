import React, {useState} from "react"
import { connect } from "react-redux"
import {editIdea, setRequestError, deleteIdea} from "../actions";
import {makeHTTPRequest} from "../helpers/makeHTTPRequest";
import { URL } from "../constants/system";

const MapDispatchToProps = (dispatch) => {
    return {editIdea: (id,type,value)=>dispatch(editIdea(id,type,value)),
            deleteIdea: (id)=>dispatch(deleteIdea(id)),
        setRequestError: (error, errorMessage) => dispatch(setRequestError(error, errorMessage))
    }
}

const IdeaLayout = ({idea, editIdea,deleteIdea,setRequestError}) => {
    const  [loading, setLoading] = useState(false)
    const [body, setBody] = useState(idea.body)
    return (
    <div className="singleIdea position-relative p-1 d-flex flex-column badge-success justify-content-between s rounded">
        {loading?<div className="editIdeaLoadingWrapper"><span className="spinner"></span></div>: null}
        <span
                className="deleteIdea"
                onClick={()=>{
                    setLoading(true)
                    makeHTTPRequest(`${URL}delete`, "POST", {id: idea.id})
                              .then(result =>{
                                    setLoading(false)
                                  if(result.success){deleteIdea(idea.id)}
                                  else {setRequestError({error: true,errorMessage: result.error})}
                              })
                }}
            >X</span>
            <input type="text"
                      className="font-weight-bold"
                      autoFocus={!idea.title}
                      defaultValue={idea.title}
                      placeholder="Title of idea"
                      onBlur={(event)=>{
                          const value = event.target.value
                          setLoading(true)
                          makeHTTPRequest(`${URL}update`, "POST", {id:idea.id, type:"title", value: value})
                              .then(result =>{
                              setLoading(false)
                                  if(result.success){editIdea({id:idea.id, type:"title", value: value})}
                                  else {setRequestError({error: true,errorMessage: result.error})}
                              })
                      }}
            />
            <textarea
                value={body}
                placeholder="Body of idea. 140 characters max"
                onChange={(event)=>{setBody(event.target.value)}}
                maxLength={140}
                onBlur={(event)=>{
                    const value = event.target.value
                    setLoading(true)
                    makeHTTPRequest(`${URL}update`, "POST", {id:idea.id, type:"body", value:value})
                              .then(result =>{
                              setLoading(false)
                                  if(result.success){editIdea({id:idea.id, type:"body", value:value})}
                                  else {setRequestError({error: true,errorMessage: result.error})}
                              })
                }}
            />
            {(body && body.length > 125)?<span className="bodyCharactersLimit align-self-end">{body.length}/140</span>:null}
            <div className="d-flex justify-content-between ideaFooter">
                <span>#{idea.id}</span>
                <span>{idea.created_date}</span>
            </div>
        </div>
    )
}
export const Idea = connect(null,MapDispatchToProps)(IdeaLayout)