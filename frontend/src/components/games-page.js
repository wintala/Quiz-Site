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
		<button id="leave-button" onClick={handleClick}>Leave game</button>
	)
}


	return(
			<div id="mygames">
				<h2>My Games</h2>
				{user.moderating.length === 0 ? 
				<div> You have no games. Ask your friends to add you as moderator to their games or create a new game</div>:
				<table>
					<tbody>
						{user.moderating.map(x => 
						<tr key={x.id}>
							<td>
								<Link to={`/games/${x.id}`}>
									{x.name}
								</Link>
							</td>
							<td>
								{leaveButton(x.id)}
							</td>
						</tr>)}
					</tbody>
				</table>}
			<GameCreationForm />
		</div>

	)
}
export default GamePage