const express = require("express");

const moviesService = require("../../models/movies");

const router = express.Router();

// маршрут  get "/"
router.get("/", async (req, res) => {
    try {
        const result = await moviesService.getAllMovies();
        res.json(result);
    } catch (error) { 
        res.status(500).json({
            message:error.message
        })
    }
});

module.exports = router;
