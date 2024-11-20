import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Context } from "../store/appContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";


export const Login = () => {

    let navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    const verify = async () => {
        await actions.login(email, password)

    }

    useEffect(()=>{
        if (store.userToken) navigate('/')
        // else alert("user not logged in")
    }, [store.userToken])

    return (
        <div id="portal">
            <input id="username" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} onKeyUp={(e) => {
                if (e.key === "Enter") {
                    verify()
            }}}/>
            <input id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}onKeyUp={(e) => {
                if (e.key === "Enter") {
                    verify()
            }}}/>
            <span id="submit" className="btn btn-primary" onClick={() => {verify()}}>Login</span>
            <span id="create" className="btn btn-warning" onClick={() => {navigate("/signup")}}>Create User</span>
        </div>
    )
}
