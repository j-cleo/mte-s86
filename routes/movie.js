const express = require("express");
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getMovies);
router.get("/:id/getMovie", movieController.getMovie);
router.patch("/:id/updateMovie", verify, verifyAdmin, movieController.updateMovie);
router.delete("/:id/deleteMovie", verify, verifyAdmin, movieController.deleteMovie);
router.post("/:id/addComment", verify, movieController.addComment);
router.get("/:id/getComments", verify, movieController.getComments);

module.exports = router;