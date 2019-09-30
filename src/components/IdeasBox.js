import React from "react"
import { connect } from "react-redux"
import {Idea} from "./Idea";
import {sortIdeasBy } from "../helpers/sortIdeasBy";


const MapStateToProps = (state) => {
    return {ideas: state.ideas, sortBy: state.serviceData.sortBy}
}
const IdeasBoxLayout = ({ideas,sortBy}) => {
    const ideasToRender =  sortIdeasBy(ideas, sortBy)
    return (
        <div className="row justify-content-center">
            {ideasToRender.map(idea => <Idea key={idea.id} idea={idea} />)}
        </div>
    )
}

export const IdeasBox = connect(MapStateToProps)(IdeasBoxLayout)




