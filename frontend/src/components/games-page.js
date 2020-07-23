import React from "react"
import { useSelector, useDispatch} from "react-redux"
import GameCreationForm from "./game-creation-form"
import { Link } from "react-router-dom"
import gameService from "../services/game"
import {leaveGame} from "../reducers/user"


const GamePage = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	if (!user) {
		return(
			<div>
				<h2>Please log in to view your games</h2>
			</div>
		)
	}

const leaveButton = (id) => {
	const handleClick = () => {
		gameService.editGame(id, {leavingModerator: user.id}, user)
		dispatch(leaveGame(id))
	}

	return(
		<button onClick={handleClick}>Leave game</button>
	)
}


	return(
		<div>
			<GameCreationForm />
			<h2>My Games</h2>
			<ul>
				{user.moderating.map(x => 
				<li key={x.id}>
					<Link to={`/games/${x.id}`}>
						{x.name}
					</Link>
					{leaveButton(x.id)}
				</li>)}
			</ul>
		</div>

	)
}
export default GamePage