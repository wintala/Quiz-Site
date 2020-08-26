import React, {useState} from "react"
import { useSelector, useDispatch} from "react-redux"
import questionService from "../services/question"
import {editQuestion, deleteQuestion} from "../reducers/game"
import {setNotification} from "../reducers/notification"
 

const QuestionEditForm = ({q}) => {
	const [question, setQuestion] = useState(q.question)
	const [followUpQuestion, setFollowUpQuestion] = useState(q.followUpQuestion)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleEdit = (e) => {
		e.preventDefault()
		const editedFollowUpQuestion = followUpQuestion ? followUpQuestion : ""
		const editedQuestion = {...q, question, followUpQuestion: editedFollowUpQuestion}
		if (followUpQuestion === q.followUpQuestion && question === q.question) {
			return null
		}
		questionService.editQuestion(editedQuestion, user).then(q => {
			dispatch(editQuestion(q))
			dispatch(setNotification("Edit successful", 2))
		})
	}

	const handleDelete = (id) => {
		if (window.confirm("Delete this question?")) {
			questionService.deleteQuestion(id, user)
			dispatch(deleteQuestion(id))
		}
	}

	return(
		<form onSubmit={handleEdit}>
		<table id="edit-table">
			<tbody>
				<tr>
					<td>
						Question:
					</td>
					<td>
						<textarea
							id="question"
							type="text"
							value={question}
							onChange={({ target }) => setQuestion(target.value)}
						/>
					</td>
				</tr>
				<tr>
					<td>
						Follow-up question:
					</td>
					<td>
						<textarea
							id="follow-up-question"
							type="text"
							value={followUpQuestion}
							onChange={({ target }) => setFollowUpQuestion(target.value)}
						/>
					</td>
				</tr>
			</tbody>
		</table>
		<button id="question-change-button">Save Changes</button>
		<button id="question-delete-button" onClick={() => handleDelete(q.id)}>Delete</button>
	</form>
	)

}

export default QuestionEditForm