import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import gameService from "../services/game"
import {addGame} from "../reducers/user"
import {setNotification} from "../reducers/notification"



const GamesCreationForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [game, setGame] = useState({name: ""})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newGame = await gameService.newGame(game, user)
		dispatch(addGame(newGame))
		dispatch(setNotification("Game created", 2))
	}

	return(
		<form id="question-creation-form" onSubmit={handleSubmit}>
		<h2>Create Game</h2>
		<div>
			<input
			placeholder="Game name"
				id="name"
				type="text"
				value={game.name}
				onChange={({ target }) => setGame({name: target.value})}
			/>
		</div>
		<button id="create-game-button">Create</button>
	</form>
	)
}

export default GamesCreationForm
