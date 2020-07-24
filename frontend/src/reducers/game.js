const reducer = (state = null, action) => {
	switch(action.type) {
    case "ACTIVATE_GAME":
      return action.data
      case "ADD_QUESTION":
        return {...state, questions: state.questions.concat(action.data)}
      case "DELETE_QUESTION":
        const questionsAfterDelete = state.questions.filter(q => q.id !== action.data)
        return {...state, questions: questionsAfterDelete}
      case "EDIT_QUESTION":
        const questionsAfterEdit = state.questions.map(q => q.id === action.data.id ? action.data : q)
        return {...state, questions: questionsAfterEdit}
    default:
        return state
  }
}

export const setGame = (game) => {
	return {type: "ACTIVATE_GAME", data: game}
}

export const addQuestion = (question) => {
  const parsedQuestion = (({question, followUpQuestion, id}) => ({question, followUpQuestion, id}))(question)
	return {type: "ADD_QUESTION", data: parsedQuestion}
}

export const deleteQuestion = (questionId) => {
  return({type: "DELETE_QUESTION", data: questionId})
}

export const editQuestion = (question) => {
  return ({type: "EDIT_QUESTION", data: question})
}

export default reducer