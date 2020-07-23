import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useRouteMatch } from "react-router-dom"
import gameService from "../services/game"
import {setGame} from "../reducers/game"

import QuestionCreationForm from "./question-creation-form"

const Game = () => {
	const [modAddFormShowing, setModAddFormShowing] = useState(false)
	const game = useSelector(state => state.game)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const match = useRouteMatch('/games/:id')
	useEffect(() => {
		gameService.oneGame(match.params.id).then(g => dispatch(setGame(g)))
}, [match.params.id, dispatch]);


	const questionList = (questions) => (
	<ul>
		{questions.map(q => 
		<li key={q.id}>
			Question: {q.question}
			Follow-up Question: {q.followUpQuestion}
		</li>)}
	</ul>)

const moderatorList = (mod) => (
	<ul>
		{mod.map(m => 
		<li key={m.id}>
			{m.username}
		</li>)}
	</ul>)

const modAdder = () => {

	const handleModAdd = (e) => {
		e.preventDefault()
		const newModerator = e.target.moderator.value
		gameService.editGame(game.id, {newModerator}, user).then(g => dispatch(setGame(g)))
		e.target.moderator.value = ""
	}

	return(
		modAddFormShowing ?
			<form onSubmit={handleModAdd}>
			<div>
				username
				<input
					name="moderator"
				/>
			</div>
			<button id="modAdd">Add Moderator</button>
		</form> :
		<button onClick={() => setModAddFormShowing(true)} >Add</button>
	)
}


	return(
		game ? 
		<div>
			<h2>{game.name}</h2>
			<h3>Moderators</h3>
			{moderatorList(game.moderators)}
			{modAdder()}
			<h3>Questions</h3>
			{questionList(game.questions)}
			<QuestionCreationForm />
		</div> :
		null
	)
} 

export default Game