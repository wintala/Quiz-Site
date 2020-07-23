const config = require("./utils/config")

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("express-async-errors")

// routers
const usersRouter = require("./routers/users")
const loginRouter = require("./routers/login")
const gameRouter = require("./routers/games")
const questionRouter = require("./routers/questions")

// middlewares
const tokenMiddlewares = require("./middlewares/token")
const logger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorLogger")

const app = express()

mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

app.use(express.json())
app.use(logger)
app.use(tokenMiddlewares.tokenExtractor)
app.use(cors())

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/games", gameRouter)
app.use("/api/questions", questionRouter)

app.use(tokenMiddlewares.tokenError)
app.use(errorHandler)

module.exports = app
