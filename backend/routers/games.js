const gamesRouter = require("express").Router()
const Game = require("../models/game")
const User = require("../models/user")

gamesRouter.get("/", async (request, response) => {
	const game = await Game.findOne({name: request.query.name})
		.populate("moderators", { username: 1 })
		.populate("questions", { question: 1, followUpQuestion: 1 })
	if (!game) {
		return response.status(404).json({error: "no matching resources"})
	}
	response.json(game)
})

gamesRouter.get("/:id", async (request, response) => {
	const game = await Game.findById(request.params.id)
		.populate("moderators", { username: 1 })
		.populate("questions", { question: 1, followUpQuestion: 1 })
	response.json(game)
})

gamesRouter.post("/", async (request, response) => {
	const body = request.body
	const decodedToken = request.decodedToken

	if (!decodedToken) {
		return response.status(401).json({ error: "token missing" })
	}

	const user = await User.findById(decodedToken.id)
	const newGame = new Game({ ...body, questions: [], moderators: [user._id] })
	const savedGame = await newGame.save()

	user.moderating = user.moderating.concat(newGame._id)
	await user.save()

	response.status(201).json(savedGame)
})

gamesRouter.put("/:id", async (request, response) => {
	const body = request.body
	const decodedToken = request.decodedToken

	if (!decodedToken) {
		return response.status(401).json({ error: "token missing" })
	}

	const game = await Game.findById(request.params.id)
	const user = await User.findById(decodedToken.id)

	if (! game.moderators.includes(user._id)) {
		return response.status(403).json({error: "your don't have access to this resource"})
	}

	if (body.newModerator) {
		const newMode = await User.findOne({ username: body.newModerator })

		if (!newMode) {
			return response.status(404).json({ error: "no matching user" })
		}
		if (!game.moderators.includes(newMode.id)) {
			game.moderators.push(newMode._id)
			newMode.moderating.push(game._id)
			newMode.save()
		}
	}
	else if (body.leavingModerator) {
		const leavingMod = await User.findById(body.leavingModerator)

		const i = leavingMod.moderating.map(m => m.toString()).indexOf(game._id)
		if (i > -1) {
			leavingMod.moderating.splice(i, 1)
		}

		leavingMod.save()

		if (game.moderators.length === 1) {
			await Game.findByIdAndRemove(game._id)
			return response.status(204).end()
		}

		const index = game.moderators.map(m => m.toString()).indexOf(body.leavingModerator)
		if (index > -1) {
			game.moderators.splice(index, 1)
		}


	}
	else if (body.newName) {
		game.name = body.newName
	}

	const savedGame = await game.save()

	const resGame = await Game.findById(savedGame._id)
		.populate("moderators", { username: 1 })
		.populate("questions", { question: 1, followUpQuestion: 1 })

	response.status(200).json(resGame)
})

module.exports = gamesRouter
