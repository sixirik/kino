import axios from 'axios'
export default class Search {
  constructor(query, genre = '') {
    ;(this.query = query), (this.genre = genre)
  }
  async findMovies(page = 1, limit = 18) {
    try {
      const result = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${this.query}&limit=${limit}&page=${page}&genre=${this.genre}`
      )
      ;(this.movies = result.data.data.movies),
        (this.movieCount = result.data.data.movie_count)
    } catch (error) {
      alert(error)
    }
  }
}
