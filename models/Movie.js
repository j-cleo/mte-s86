const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Movie title is required"]
	},
	director: {
		type: String,
		required: [true, "Movie director is required"]
	},
	year: {
		type: Number,
		required: [true, "Movie year is required"]
	},
	description: {
		type: String,
		required: [true, "Movie description is required"]
	},
	genre: {
		type: String,
		required: [true, "Movie director is required"]
	},
	comments: [
		{
			userId: {
				type: String,
				required: [true, "User Id is required"]
			},
			comment: {
				type: String,
				required: [true, "Comment is required"]
			}
		}
	]
});

module.exports = mongoose.model('Movie', movieSchema);