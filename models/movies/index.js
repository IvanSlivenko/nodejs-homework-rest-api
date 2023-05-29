const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');


// Визначаємо шлях до файла
const moviesPath = path.join(__dirname, "movies.json");

const updateMovies = async (movies) =>
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));


const getAllMovies = async () => {
//  читаємо файл, як текст
  const data = await fs.readFile(moviesPath);
//  переводимо текст в JSON  
  return JSON.parse(data);
}

const getMovieById = async (id) => {
  // отримуємо всі фільми
  const movies = await getAllMovies();
  // шукаємо фільм з потрібниь id
  const result = movies.find((item) => item.id === id);
  // повертаємо результат
  return result || null;
}

const addMovie = async ({title, director}) => {

  // отримує всі фільми,що були
  const movies = await getAllMovies();
  // cтворюємо новий фільм
  const newMovie = {
    id: nanoid(),
    title,
    director,
  };

  // додаємо до всіх фільмів,що були новий фільм
  movies.push(newMovie);

  // Перезаписуємо JSON
  // await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  await updateMovies(movies);
  // повертаємо результат
  return newMovie;
}
 
const updateMovieById = async (id, data) => {
  // отримуємо всі фільми
  const movies = await getAllMovies();
  // шукаємо фільм з потрібниь id
  const index = movies.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  movies[index] = { id, ...data };
  // Перезаписуємо JSON
  // await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  await updateMovies(movies);
  // повертаємо результат
  return movies[index];
}

const deleteById = async (id) => {
  // отримуємо всі фільми
  const movies = await getAllMovies();

  // шукаємо фільми з потрібниь id
  const index = movies.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  // Видаляємо фільм
  const [result] = movies.splice(index, 1);

  // Перезаписуємо JSON
  // await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
  await updateMovies(movies);

  // повертаємо результат
  return result;
}

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteById,
};
