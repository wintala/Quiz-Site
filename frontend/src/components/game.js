import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useRouteMatch, Redirect } from "react-router-dom"
import gameService from "../services/game"
import {setGame} from "../reducers/game"
import QuestionEditForm from "./question-edit-form"
import { setNotification } from "../reducers/notification";

import QuestionCreationForm from "./question-creation-form"

const Game = () => {
	const [modAddFormShowing, setModAddFormShowing] = useState(false)
	const [startPlay, setStartPlay] = useState(false)
	const game = useSelector(state => state.game)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const match = useRouteMatch('/games/:id')
	useEffect(() => {
		gameService.oneGame(match.params.id).then(g => dispatch(setGame(g)))
}, [match.params.id, dispatch])

	if (startPlay) {
		return <Redirect to={`/playing/${game.id}`} />
	}


	const questionList = (questions) => (
		questions.length === 0 ?
		<div style={{marginBottom: "50px"}}>This game has no questions yet</div> :
		<table id="question-table">
			<tbody>
				<tr>
					<th>
						QUESTION
					</th>
					<th>
						FOLLOW-UP QUESTION
					</th>
				</tr>
				{questions.map(q => 
				<tr key={q.id}>
					<td>{q.question}</td>
					<td>{q.followUpQuestion}</td>
				</tr>)}
			</tbody>
		</table>
		)

	const myQuestionList = (questions) => {

		return(
			<div>
				<h2>My questions in this game</h2>
				{questions.length === 0 ?
				<div>You haven't created any question to this game</div> :
				<table id="my-questions-table">
					<tbody>
						{questions.filter(q => user.questions.includes(q.id)).map(q => 
						<tr key={q.id}>
							<td>
								<QuestionEditForm q={q} />
							</td>
						</tr>)}
					</tbody>
				</table>}
			</div>
		)
	}

	const moderatorList = (mod) => (
		<table id="mod-table">
			<tbody>
				{mod.map(m => 
				<tr key={m.id}>
					<td>
						{m.username}
					</td>
				</tr>)}
			</tbody>
		</table>)

	const modAdder = () => {

		const handleModAdd = (e) => {
			e.preventDefault()
			const newModerator = e.target.moderator.value
			gameService.editGame(game.id, {newModerator}, user).then(g => dispatch(setGame(g)))
			.catch(e => dispatch(setNotification(`User "${newModerator}" doesn't exist`, 3)))
			e.target.moderator.value = ""
		}

	return(
		modAddFormShowing ?
			<form id="mod-add-form" onSubmit={handleModAdd}>
			<div>
				Username
				<input
					name="moderator"
				/>
			</div>
			<button id="modAdd">Add Moderator</button>
		</form> :
		<button id="show-modAdd" onClick={() => setModAddFormShowing(true)} >Add</button>
	)
}


	return(
		game ? 
		<div id="game" >
			<h1>{game.name}</h1>
			<button id="play-button" onClick={() => {setStartPlay(true)}} >Play</button>
			<h2>Moderators</h2>
			{moderatorList(game.moderators)}
			{user && game.moderators.map(m => m.id).includes(user.id) ?
			modAdder() :
			null}
			<h2>Questions</h2>
			{questionList(game.questions)}

			{user && game.moderators.map(m => m.id).includes(user.id) ?
			<>
				<QuestionCreationForm />
				{myQuestionList(game.questions)} 
			</>:
			null}
		</div> :
		null
	)
} 

export default Game