import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import questionService from "../services/question"
import {addQuestion} from "../reducers/game"
import {setNotification} from "../reducers/notification"
 

const QuestionCreationForm = () => {
	const [question, setQuestion] = useState("")
	const [followUpQuestion, setFollowUpQuestion] = useState("")
	const [showFollowUp, setShowfollowUp] = useState(false)
	const game = useSelector(state => state.game)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleCreation = (e) => {
		e.preventDefault()
		const newFollowUpQuestion = followUpQuestion ? followUpQuestion : ""
		const newQuestion = {question, followUpQuestion: newFollowUpQuestion}
		questionService.newQuestion(newQuestion, game.id, user).then(q => {
			dispatch(addQuestion(q))
			dispatch(setNotification("Question added", 2))
		})	
	}

	return(
		<form id="question-creation-form" onSubmit={handleCreation}>
		<h3>Add Question</h3>
		<div id="player-placement-info">
			Use double hashtag "##" if you want to place player names to your question
			<div className="tooltip">
				Every "##" in question will be replaced by one unique randomly selected player of the game
			</div>
		</div>
		<div>
			Question
			<textarea
				id="question"
				type="text"
				value={question}
				onChange={({ target }) => setQuestion(target.value)}
			/>
		</div>
		{showFollowUp ? 
		<div>
			Follow-up question
			<textarea
				id="follow-up-question"
				type="text"
				value={followUpQuestion}
				onChange={({ target }) => setFollowUpQuestion(target.value)}
			/>
		</div>:
		null}
		{showFollowUp ? 
		null : 
		<button id="show-followup-button" type="button" onClick={() => setShowfollowUp(true)}>
			Add Follow-up Question
		</button>}
		<button id="question-create-button">Create</button>
	</form>
	)

}

export default QuestionCreationForm