import React, { useState } from "react"
import loginService from "../services/login";
import {setUser} from "../reducers/user"
import {useDispatch} from "react-redux"

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		loginService.login({username, password})
		.then(user => {
			dispatch(setUser(user))
			window.localStorage.setItem('loggedUser', JSON.stringify(user.token))
			setUsername("")
			setPassword("")
		})
	}

	return (
		<form onSubmit={handleLogin}>
			<h1>Log in</h1>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id="login-button">login</button>
		</form>
	)
}

export default LoginForm
