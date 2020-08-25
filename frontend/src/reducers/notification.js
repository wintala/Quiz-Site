const reducer = (state = {text: "", time: 0}, action) => {
	switch(action.type) {
			case 'SHOW_NOTI':
					return {text: action.data.text, time: action.data.time * 1000}
			case 'HIDE_MESSAGE':
					return {text: "", time: 0}
			default:
					return state
	}
}

export const setNotification = (text, time) => {
	return {type: "SHOW_NOTI", data: {text, time}}
}

export const hideNotification = () => {
	return {
		type: "HIDE_MESSAGE"
}
}


export default reducer