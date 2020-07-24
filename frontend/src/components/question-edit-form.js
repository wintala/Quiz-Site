import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import questionService from "../services/question"
import {editQuestion, deleteQuestion} from "../reducers/game"
 

const QuestionEditForm = ({q}) => {
	const [question, setQuestion] = useState(q.question)
	const [followUpQuestion, setFollowUpQuestion] = useState(q.followUpQuestion)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleEdit = (e) => {
		e.preventDefault()
		const editedFollowUpQuestion = followUpQuestion ? followUpQuestion : ""
		const editedQuestion = {...q, question, followUpQuestion: editedFollowUpQuestion}
		questionService.editQuestion(editedQuestion, user).then(q => {dispatch(editQuestion(q))})
	}

	const handleDelete = (id) => {
		questionService.deleteQuestion(id, user)
		dispatch(deleteQuestion(id))
	}

	return(
		<form onSubmit={handleEdit}>
		<div>
			Question
			<input
				id="question"
				type="text"
				value={question}
				onChange={({ target }) => setQuestion(target.value)}
			/>
		</div>
		<div>
			Follow-up question
			<input
				id="follow-up-question"
				type="text"
				value={followUpQuestion}
				onChange={({ target }) => setFollowUpQuestion(target.value)}
			/>
		</div>
		<button id="login-button">Save Changes</button>
		<button onClick={() => handleDelete(q.id)}>Delete</button>
	</form>
	)

}

export default QuestionEditForm