const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
	name: {type: String, required: true},
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
		},
	],
	moderators: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
})

gameSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const User = mongoose.model("Game", gameSchema)

module.exports = User
