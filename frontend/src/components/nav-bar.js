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
		<div>
			<Link to="/">Home</Link>
			{!user ?
				<>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link> 
				</> :
				<>
				<Link to="/games">My Games</Link>
				<button onClick = {logOut}>Log Out</button>
				</>}

		</div>
	)
}

export default NavBar
