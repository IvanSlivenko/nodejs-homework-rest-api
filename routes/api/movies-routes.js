const express = require("express");
const Joi = require("joi");


const moviesService = require("../../models/movies");
const {HttpError} = require("../../helpers");

const router = express.Router();

const movieAddSchema = Joi.object({
  
});

// маршрут  get "/"
router.get("/", async (req, res, next) => {
    try {
        const result = await moviesService.getAllMovies();
        res.json(result);
    } catch (error) {
      // Варіант 1
      // res.status(500).json({
      //     message:error.message
      // })

      // шукаємо функцію з чотирма аргументами (err, req, res, next)
      next(error);
    }
});

// маршрут get  "/:Id"
router.get('/:id', async (req, res, next) => { 
    try {
        const { id } = req.params;
        const movie = await moviesService.getMovieById(id);

      if (!movie) {
        // Error Варіант 3
        throw HttpError(404,`Movie with ${id} not found`);
        
        // Error Варіант 1
        //   return res.status(404).json({
        //     message: "Not Found",
        //   });

        // Error Варіант 2
        //  const error = new Error("Not Found");
        //  error.statusCode = 404;
        // throw error;
      }

        res.json(movie);
    }
    catch (error) {
      // Варіант № 1
      // const { status = 500, message = "Server error" } = error;
      // res.status(status).json({
      //   message,
      // });

      // шукаємо функцію з чотирма аргументами (err, req, res, next)
      next(error);
    }
});

router.post("/", async (req, res) => { 
  try {
    // console.log(req.body);
    const result = await moviesService.addMovie(req.body);
    res.status(201).json(result);
  }
  catch (error) { 
    next(error);
  }

});

module.exports = router;



