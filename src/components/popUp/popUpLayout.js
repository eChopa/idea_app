import React from "react";

export const PopUp = ({message, styleAlert}) => {
    return (
            <div className={`PopUpInfo position-absolute alert text-center ${styleAlert}`}>
                <span>{message}</span>
            </div>
    )
}