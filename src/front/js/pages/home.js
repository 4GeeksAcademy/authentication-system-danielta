import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate()

	const logout =() => {
		store.userToken = null
		store.userEmail = null
		if (store.userToken == null)
			navigate('/login')
	}

	if (store.userToken) {
		return (
			<div className="text-center mt-5">
				<h1>Hello Rigo!!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<span id="submit" className="btn btn-primary" onClick={() => {logout()}}>Logout</span>
				<span id="submit" className="btn btn-success" onClick={() => {navigate('/private')}}>Private Page</span>
			</div>
		)
	}
	else navigate("/login");
	return null;
}
