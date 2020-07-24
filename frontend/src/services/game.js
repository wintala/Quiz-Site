import axios from 'axios'
const baseUrl = '/api/games'

const newGame = async (game, user) => {
	const config = {
    headers: { Authorization: `bearer ${user.token}`},
  }
  return axios.post(baseUrl, game, config).then(response => response.data)
}

const oneGame = async id => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

const editGame = async (id, req, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}`},
  }
  return axios.put(`${baseUrl}/${id}`, req, config).then(response => response.data)
}

const findGame = async (name) => {
  const config = {
    params: {name},
  }

  return axios.get(baseUrl, config).then(response => response.data)
}


export default {newGame, oneGame, editGame, findGame}