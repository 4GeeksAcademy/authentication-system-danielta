import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Context } from "../store/appContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";


export const Private = () => {

    const { store, actions } = useContext(Context);
    let navigate = useNavigate()

    useEffect(()=>{
        if (store.userToken) {actions.userInfo()}}
        , [])

    if (store.userToken) {
        return (
            <div id='userInfo'>
                <h1>Account Information</h1>
                <h3>User Email: {store.userEmail}</h3>
                <h3>User ID: {store.userId}</h3>
                <h3>User password: {store.userPassword}</h3>
                <span id="create" className="btn btn-success" onClick={() => {navigate("/")}}>Return Home</span>
            </div>
        )
    } else navigate('/login')
        return null

}