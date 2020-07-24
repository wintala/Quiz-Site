import axios from "axios"
const baseUrl = '/api/questions'

const newQuestion = async (question, gameId, user) => {
	const config = {
    headers: { Authorization: `bearer ${user.token}`},
	}
	const req = {...question, game: gameId}
  return axios.post(baseUrl, req, config).then(response => response.data)
}

const deleteQuestion = async (id, user) => {
	const config = {
    headers: { Authorization: `bearer ${user.token}`},
	}
  axios.delete(`${baseUrl}/${id}`, config)
}

const editQuestion = async (question, user) => {
	const config = {
    headers: { Authorization: `bearer ${user.token}`},
	}
  return axios.put(`${baseUrl}/${question.id}`, question, config).then(r => r.data)
}

export default {newQuestion, deleteQuestion, editQuestion}