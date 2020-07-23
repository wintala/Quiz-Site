const reducer = (state = null, action) => {
	switch(action.type) {
    case "ACTIVATE_GAME":
			return action.data
    default:
        return state
  }
}

export const setGame = (game) => {
	return {type: "ACTIVATE_GAME", data: game}
}

export default reducer