const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
	question: { type: String, required: true },
	followUpQuestion: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	},
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Game",
		require: true
	},
})

gameSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const User = mongoose.model("Question", gameSchema)

module.exports = User
