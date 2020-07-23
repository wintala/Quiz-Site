const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	username: {type: String, require: true},
	passwordHash: String,
	moderating: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Game",
	}],
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Question",
	}]
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.passwordHash
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const User = mongoose.model("User", userSchema)

module.exports = User
