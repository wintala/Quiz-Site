import axios from "axios"
const baseUrl = '/api/questions'

const newQuestion = async (question, gameId, user) => {
	const config = {
    headers: { Authorization: `bearer ${user.token}`},
	}
	const req = {...question, game: gameId}
  return axios.post(baseUrl, req, config).then(response => response.data)
}

export default {newQuestion}