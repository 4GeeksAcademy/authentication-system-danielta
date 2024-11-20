import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";


export const Signup = () => {

    let navigate = useNavigate();
    
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [emailVerify, setEmailVerify] = useState("")
	const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")

    const verify = async ()=> {
        if (email == emailVerify) {
            if (password == passwordVerify) {
                actions.createUser(email, password)
                navigate("/login")
            }
            else alert("password fields do not match")
        }
        else alert("email fields do not match")
    }

    return (
        <div id="creator">
            <input id="username" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input id="username" placeholder="re-enter email" onChange={(e) => setEmailVerify(e.target.value)} value={emailVerify} onKeyUp={(e) => {
                if (e.key === "Enter") {
                    verify()
            }}}/>
            <input id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <input id="password" placeholder="re-enter password" onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify}onKeyUp={(e) => {
                if (e.key === "Enter") {
                    verify()
            }}}/>
            <span id="submit" className="btn btn-primary" onClick={() => {verify()}}>Create</span>
        </div>
    )


}