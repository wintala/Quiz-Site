import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import questionService from "../services/question"
import {addQuestion} from "../reducers/game"
 

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
		questionService.newQuestion(newQuestion, game.id, user).then(q => {dispatch(addQuestion(q))})	
	}

	return(
		<form onSubmit={handleCreation}>
		<h2>Add Question</h2>
		<div>
			question
			<input
				id="question"
				type="text"
				value={question}
				onChange={({ target }) => setQuestion(target.value)}
			/>
		</div>
		{showFollowUp ? 
		<div>
			follow-up question
			<input
				id="follow-up-question"
				type="text"
				value={followUpQuestion}
				onChange={({ target }) => setFollowUpQuestion(target.value)}
			/>
		</div>:
		null}
		<button type="button" onClick={() => setShowfollowUp(true)}>Add Follow-up Question</button>
		<button id="login-button">Create</button>
	</form>
	)

}

export default QuestionCreationForm