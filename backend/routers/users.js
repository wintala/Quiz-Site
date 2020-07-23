const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
	const decodedToken = request.decodedToken

	if (!decodedToken) {
		return response.status(401).json({ error: "token missing" })
	}
	const user = await User.findById(decodedToken.id).populate("moderating", {name: 1})
	response.json(user)
})

usersRouter.post("/", async (request, response) => {
	const body = request.body

	if (body.username.length < 4 || body.password.length < 4) {
		return response
			.status(400)
			.json({
				error:
					"bad request, username and password need to be atleast three characters long",
			})
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		passwordHash,
		blogs: [],
	})

	const savedUser = await user.save()

	response.json(savedUser)
})

module.exports = usersRouter
