import React, { useState } from "react"
import signUpService from "../services/signup";
import loginService from "../services/login";
import {setUser} from "../reducers/user"
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

const SignUpForm = () => {

	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")
	const user = useSelector(state => state.user)

	if (user) {
		return <Redirect to="/games" />
	}

	const handleSignUp = async (e) => {
		e.preventDefault()
		await signUpService.createUser({username, password})
		// auto login after singing up
		await loginService.login({username, password})
		.then(user => {
			window.localStorage.setItem('loggedUser', JSON.stringify(user.token))
			dispatch(setUser(user))
		})
	}

	const disableSubmit = ((password !== password2) || (password.length < 4))

	const infoText = (password) ? 
		(password.length < 4) ? 
			"Password must contain atleast 3 characters" : 
			(password2) ?
				(password !== password2) ?
					"Passwords dont match" :
					null :
				null :
		null


	return (
		<form onSubmit={handleSignUp} className="user-form">
			<h1>Sign Up</h1>
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
			<div>
				password again
				<input
					id="password2"
					type="password"
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
				/>
			</div>
			<button id="login-button" disabled={disableSubmit}>Sign Up</button>
			{infoText ?
				<div id="password-message">{infoText}</div> :
				null
			}
		</form>
	)
}

export default SignUpForm
