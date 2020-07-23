import axios from "axios"
const baseUrl = '/api/users'

const getUserData = async (token) => {
	const config = {
    headers: { Authorization: `bearer ${token}`},
	}
  return axios.get(baseUrl, config).then(response => response.data)
}

export default {getUserData}