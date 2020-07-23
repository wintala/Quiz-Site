import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import gameService from "../services/game"
import {addGame} from "../reducers/user"



const GamesCreationForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [game, setGame] = useState({name: ""})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newGame = await gameService.newGame(game, user)
		dispatch(addGame(newGame))
	}

	return(
		<form onSubmit={handleSubmit}>
		<h1>Create Game</h1>
		<div>
			Name
			<input
				id="name"
				type="text"
				value={game.name}
				onChange={({ target }) => setGame({name: target.value})}
			/>
		</div>
		<button id="login-button">Create</button>
	</form>
	)
}

export default GamesCreationForm
