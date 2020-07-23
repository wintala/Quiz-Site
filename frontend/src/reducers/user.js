const reducer = (state = null, action) => {
	switch(action.type) {
    case "LOGIN":
			return action.data
		case "ADD_GAME":
			const newQuestions = state.moderating.concat(action.data)
			return {...state, moderating: newQuestions}
		case "LEAVE_GAME":
			const moderatingAfterLeave = state.moderating.filter(g => g.id !== action.data)
			return {...state, moderating: moderatingAfterLeave}
    default:
        return state
  }
}

export const setUser = (user) => {
	return {type: "LOGIN", data: user}
}

export const addGame = (game) => {
	return {type: "ADD_GAME", data: game}
}

export const leaveGame = (gameId) => {
	return {type: "LEAVE_GAME", data: gameId}
}

export default reducer