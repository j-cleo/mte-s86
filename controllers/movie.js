const Movie = require("../models/Movie.js");
const { errorHandler } = require('../auth.js');

module.exports.addMovie = (req, res) => {
	const { title, director, year, description, genre } = req.body;

	let newMovie = new Movie({
		title: title,
		director: director,
		year: year,
		description: description,
		genre: genre
	})

	return newMovie.save()
	.then(result => res.status(201).send({
		result
	}))
	.catch(err => errorHandler(err, req, res));
}

module.exports.getMovies = (req, res) => {
	return Movie.find({})
	.then(movie => {
		
		if(!movie) {
			return res.status(404).send({ error: "Movie not found!" });
		}

		return res.status(200).send({ movies: movie });

	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.getMovie = (req, res) => {
	return Movie.findById(req.params.id)
	.then(movie => {

		if(!movie) {
			return res.status(404).send({ error: "Movie not found!" });
		}

		return res.status(200).send({ movie });

	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.updateMovie = (req, res) => {
	let movieUpdate = {
		title: req.body.title,
		director: req.body.director,
		year: req.body.year,
		description: req.body.description,
		genre: req.body.genre
	}

	return Movie.findByIdAndUpdate(req.params.id, movieUpdate)
	.then(movie => {
		if(!movie) {
			return res.status(404).send({ error: "Movie not found!"})
		}

		return res.status(200).send({ message: "Movie updated successfully!"});
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.deleteMovie = (req, res) => {
	return Movie.findByIdAndDelete(req.params.id)
	.then(movie => {
		if(!movie) {
			return res.status(404).send({ error: "Movie not found!" });
		}

		return res.status(200).send({ message: "Movie deleted successfully!" });
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.addComment = (req, res) => {
	const userId = req.user.id;
	const { comment } = req.body;

	return Movie.findById(req.params.id)
	.then(movie => {

		if(!movie) {
			return res.status(404).send({ error: "Movie not found!" });
		}

		movie.comments.push({
			userId: userId,
			comment: comment
		})

		return movie.save()
		.then(movie => {
			res.status(201).send({
				message: "Added comment successfully!"
			});
		});
	})
	.catch(err => errorHandler(err, req, res));
}

module.exports.getComments = (req, res) => {
	return Movie.findById(req.params.id)
	.then(movie => {
		if(!movie.comments) {
			return res.status(400).send({ error: "Error fetching comments!"});
		}

		return res.status(200).send({ comments: movie.comments });
	})
}