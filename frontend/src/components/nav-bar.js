import { Link } from "react-router-dom"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {setUser} from "../reducers/user"

const NavBar = () => {
	const dispatch =useDispatch()
	const user = useSelector(state => state.user)

	const logOut = () => {
		window.localStorage.removeItem('loggedUser')
		dispatch(setUser(null))
	}
	return (
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			{!user ?
				<>
					<Link id="signup" to="/signup">Sign Up</Link> 
					<Link id="login" to="/login">Login</Link>
				</> :
				<>
				<Link to="/games">My Games</Link>
				<button className="log-out-button" onClick = {logOut}>Log Out</button>
				<span>{`Logged in ${user.username}`}</span>
				</>}

		</div>
	)
}

export default NavBar
