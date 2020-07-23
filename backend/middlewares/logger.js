const logger = (req, res, next) => {
	console.log("Method:", req.method)
	console.log("Route:", req.originalUrl)
	console.log("Body:", req.body)
	console.log("-----------------------------------")
	next()
}

module.exports = logger