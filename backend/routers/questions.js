const questionRouter = require("express").Router()
const Question = require("../models/question")
const User = require("../models/user")
const Game = require("../models/game")

questionRouter.get("/", async (request, response) => {
	const questions = await Question.find({})
	response.json(questions)
})

questionRouter.get("/:id", async (request, response) => {
	const question = await Question.findById(request.params.id)
	response.json(question)
})

questionRouter.post("/", async (request, response) => {
	const body = request.body
	const decodedToken = request.decodedToken

	if (!decodedToken) {
		return response.status(401).json({ error: "token missing" })
	}

	const user = await User.findById(decodedToken.id)
	const game = await Game.findById(body.game)
	const newQuestion = new Question({ ...body, user: user._id })

	user.questions.push(newQuestion._id)
	game.questions.push(newQuestion._id)
	await user.save()
	await game.save()

	const savedQuestion = await newQuestion.save()

	response.status(201).json(savedQuestion)
})

questionRouter.delete("/:id", async (request, response) => {
	const decodedToken = request.decodedToken

	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing" })
	}

	const user = await User.findById(decodedToken.id)
	const question = await Question.findById(request.params.id)
	const game = await Game.findById(question.game)

	if (user._id.toString() !== question.user.toString()) {
		return(response.status(403).json({ error: "possible to delete only user's own question" }))
	}

	Question.findByIdAndRemove(request.params.id)

	user.questions = user.questions.filter((x) => x._id.toString() !== request.params.id)
	game.questions = game.questions.filter((x) => x._id.toString() !== request.params.id)
	user.save()
	game.save()

	await Question.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

questionRouter.put("/:id", async (request, response) => {
	const body = request.body
	const decodedToken = request.decodedToken

	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing" })
	}

	const user = await User.findById(decodedToken.id)
	const question = await Question.findById(request.params.id)
	

	if (user._id.toString() !== question.user.toString()) {
		return(response.status(403).json({ error: "possible to edit only user's own question" }))
	}

	const editedQuestion = await Question.findByIdAndUpdate(request.params.id, body, {new: true})

	response.json(editedQuestion)
})

module.exports = questionRouter