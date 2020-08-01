import React, { useState } from "react"
import loginService from "../services/login"
import {Redirect} from "react-router-dom"
import {setUser} from "../reducers/user"
import {useDispatch, useSelector} from "react-redux"

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const user = useSelector(state => state.user)

	const handleLogin = (e) => {
		e.preventDefault()
		loginService.login({username, password})
		.then(user => {
			dispatch(setUser(user))
			window.localStorage.setItem('loggedUser', JSON.stringify(user.token))
		})
	}

	if (user) {
		return <Redirect to="/games" />
	}

	return (
		<form onSubmit={handleLogin} className="user-form">
			<h1>Log in</h1>
			<div>
				Username
				<input
					id="username"
					type="text"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					id="password"
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id="login-button">Login</button>
		</form>
	)
}

export default LoginForm
