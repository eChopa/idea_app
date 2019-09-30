import React from "react"
import { connect }from "react-redux"
import {sortIdeas} from "../actions";
import { AddNewIdea } from "./AddNewIdea";


const MapDispatchToProps = (dispatch) => {
    return {sortIdeas: (sortBy) => dispatch(sortIdeas(sortBy)) }
}

const HeaderLayout = ({sortIdeas}) => {
    return (
        <div className="row flex-column flex-md-row justify-content-center justify-content-md-around align-items-center">

            <div className="text-center">
                <select
                    className="form-control"
                onChange={(event)=>{sortIdeas(event.target.value)}}>
                    <option value="default">default</option>
                    <option value="titleAZ">title(A-Z)</option>
                    <option value="titleZA">title(Z-A)</option>
                    <option value="created_date_old">create date(old first)</option>
                    <option value="created_date_new">create date(new first)</option>
                </select>
            </div>
            <h1>Idea app</h1>
            <AddNewIdea/>
        </div>
    )
}

export const Header = connect(null,MapDispatchToProps)(HeaderLayout)