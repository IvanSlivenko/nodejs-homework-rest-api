const express = require("express");
const Joi = require("joi");


const moviesService = require("../../models/movies");
const {HttpError} = require("../../helpers");

const router = express.Router();

const movieAddSchema = Joi.object({
  title: Joi.string().required(), // string() - строка, required() - обов'зковий
  director: Joi.string().required().messages({
    "any.required": `"director" is a required field`,
    "string.empty": `"director" cannot be an empty field`,
  }), // string() - строка, required() - обов'зковий
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

router.post("/", async (req, res, next) => { 
  try {
 
    const { error } = movieAddSchema.validate(req.body); // validate() - перевіряємо req.body
    if (error) {
      throw HttpError(400, error.message);
     }
    const result = await moviesService.addMovie(req.body);
    res.status(201).json(result);
  }
  catch (error) { 
    next(error);
  }

});

router.put("/:id", async (req, res, next) => {
  try { 
    // первіряємо тіло запиту
const { error } = movieAddSchema.validate(req.body); // validate() - перевіряємо req.body
if (error) {
  throw HttpError(400, error.message);
    }
    const { id } = req.params;
   const result = await moviesService.getMovieById(id,req.body); 
  }
  catch (error) { 
    next(error);
  }
 });

module.exports = router;



