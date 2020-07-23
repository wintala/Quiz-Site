const jwt = require("jsonwebtoken")


const tokenExtractor = (req, res, next) => {
	const auth = req.get("authorization")
	if (auth && auth.toLowerCase().startsWith("bearer ")) {
		const token = auth.substring(7)
		const decodedToken = jwt.verify(token, process.env.SECRET)
		req.decodedToken = decodedToken
	}
	next()
}

const tokenError = (error, req, res, next) => {
	if (error.name === "JsonWebTokenError") {
		return res.status(401).json({ error: "invalid token" })
	}
	next(error)
}

module.exports = {
	tokenExtractor,
	tokenError
}
