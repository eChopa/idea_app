import React, {useEffect, useState} from 'react';
import './App.css';
import { Header } from "./components/Header";
import { IdeasBox} from "./components/IdeasBox";
import {connect} from "react-redux"
import {loadIdeasFromServer, setRequestError, setUpdateSuccess} from "./actions";
import {makeHTTPRequest} from "./helpers/makeHTTPRequest";
import {URL} from "./constants/system";
import {PopUp } from "./components/popUp/popUpLayout";


const MapStateToProps = (state) => {
    return {errorInfo: state.serviceData.errorInfo,
        updateSuccess: state.serviceData.updateSuccess
    }
}
const MapDispatchToProps = (dispatch) => {
    return { loadIdeasFromServer: (ideas) => dispatch(loadIdeasFromServer(ideas)),
        setRequestError: (error, errorMessage) => dispatch(setRequestError(error, errorMessage)),
        setUpdateSuccess: () => dispatch(setUpdateSuccess())
    }
}
const AppLayout =({errorInfo,loadIdeasFromServer,setRequestError, updateSuccess, setUpdateSuccess}) => {
    const  [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        makeHTTPRequest(`${URL}ideas`, "GET")
            .then(result =>{
                setLoading(false)
                if(result.success){
                    loadIdeasFromServer(result.data)
                }
                else {setRequestError({error: true,errorMessage: result.error})}
            })
    },[])
    useEffect(()=>{
        if(errorInfo.error){setTimeout(()=>{setRequestError({error: false, errorMessage:null})},2000)}
    },[errorInfo])
    useEffect(()=>{
        if(updateSuccess){setTimeout(()=>{setUpdateSuccess()},2000)}
    },[updateSuccess])
  return (
    <div className="container mainBlock rounded p-4">
        <Header/>
        {loading?<div className="d-flex justify-content-center align-content-center"><span className="spinner"></span></div>:<IdeasBox/>}
        {errorInfo.error? <PopUp styleAlert={"alert-danger"} message={errorInfo.errorMessage}/> : null}
        {updateSuccess? <PopUp styleAlert={"alert-success"} message="Your data updated successfully"/> : null}
    </div>
  )
}

const App = connect(MapStateToProps,MapDispatchToProps)(AppLayout)

export default App;
