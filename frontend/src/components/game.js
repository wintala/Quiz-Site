import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useRouteMatch, Redirect } from "react-router-dom"
import gameService from "../services/game"
import {setGame} from "../reducers/game"
import QuestionEditForm from "./question-edit-form"

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
	<ul>
		{questions.map(q => 
		<li key={q.id}>
			Question: {q.question}
			Follow-up Question: {q.followUpQuestion}
		</li>)}
	</ul>)

	const myQuestionList = (questions) => {

		return(
			user && game.moderators.map(m => m.id).includes(user.id) ?
			<div>
				<h3>My questions in this game</h3>
				<ul>
					{questions.filter(q => user.questions.includes(q.id)).map(q => 
					<li key={q.id}>
						<QuestionEditForm q={q} />
					</li>)}
				</ul>
				<QuestionCreationForm />
			</div> :
			null
		)
	}

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
			<button onClick={() => {setStartPlay(true)}} >Play</button>
			<h3>Moderators</h3>
			{moderatorList(game.moderators)}
			{user && game.moderators.map(m => m.id).includes(user.id) ?
			modAdder() :
			null}
			<h3>Questions</h3>
			{questionList(game.questions)}
			{myQuestionList(game.questions)}
		</div> :
		null
	)
} 

export default Game