import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (user) => {
  return axios.post(baseUrl, user).then(response => response.data)
}

export default {createUser}