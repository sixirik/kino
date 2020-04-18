import { elements } from './base'
export const getInput = () => elements.searchField.value
export const clearInput = () => (elements.searchField.value = '')

// Replacing genre with  Font Awesome icons
const renderGenre = (genre) => {
  const genreIcons = {
    Action: '<i class="fas fa-fist-raised"></i>',
    Adventure: '<i class="fas fa-dharmachakra"></i>',
    Animation: '<i class="fas fa-paint-brush"></i>',
    Biography: '<i class="fas fa-book"></i>',
    Comedy: '<i class="fas fa-theater-masks"></i>',
    Crime: '<i class="fas fa-user-secret"></i>',
    Documentary: '<i class="fas fa-landmark"></i>',
    Drama: '<i class="fas fa-sad-tear"></i>',
    Family: '<i class="fas fa-users"></i>',
    Fantasy: '<i class="fas fa-dragon"></i>',
    History: '<i class="fas fa-history"></i>',
    Horror: '<i class="fas fa-skull"></i>',
    Music: '<i class="fas fa-music"></i>',
    Musical: '<i class="fas fa-guitar"></i>',
    Mystery: '<i class="fas fa-ghost"></i>',
    Romance: '<i class="fas fa-heart"></i>',
    'Sci-Fi': '<i class="fas fa-atom"></i>',
    'Short Film': ' <i class="fas fa-film"></i>',
    Sport: '<i class="fas fa-basketball-ball"></i>',
    Superhero: '<i class="fas fa-spider"></i>',
    Thriller: '<i class="fas fa-skull-crossbones"></i>',
    War: '<i class="fas fa-fighter-jet"></i>',
    Western: '<i class="fas fa-hat-cowboy"></i>',
    'Film Noir': '<i class="fas fa-user-tie"></i>',
  }
  let markup = ''
  genre.forEach((el) => {
    if (genreIcons[el]) markup += `${genreIcons[el]}`
  })
  return markup
}
// Visualize rating with stars and colors
const renderRating = (rating10) => {
  const rating5 = Math.round(rating10 / 2)
  let starsMarkup = ''
  for (let i = 0; i < rating5; i++) {
    starsMarkup += '<i class="fas fa-star"></i>'
  }
  for (let i = 0; i < 5 - rating5; i++) {
    starsMarkup += '<i class="far fa-star"></i>'
  }
  let grade
  if (rating10 >= 7) grade = '--good'
  if (rating10 > 4 && rating10 < 7) grade = '--ok'
  if (rating10 <= 4) grade = '--bad'
  let markup = `
    <div class="movie__rating ${grade}">
    ${starsMarkup}
    <span class="movie__rating__score">${rating10}/10</span>
  </div>`
  return markup
}

const renderMovie = (movie) => {
  const markup = `
    <div class="movie" data-id="${movie.id}">
    <img  class="movie__img" src="${
      movie.medium_cover_image
    } " onerror="this.src='https://picsum.photos/200/300?grayscale';">
    <div class="movie-body">
      <h4 class="movie__title">${movie.title}</h4>
    <p class="movie__year">${movie.year}</span>
    ${renderRating(movie.rating)}    
        <div class="movie__genre">
        ${renderGenre(movie.genres)}
        </div>        
    
    </div>
    `
  return markup
}
export const renderResults = (movies) => {
  movies.forEach((movie) => {
    const markup = renderMovie(movie)
    elements.movies.insertAdjacentHTML('beforeend', markup)
  })
}

export const renderError = () => {
  const markup = `<main class="movies">
<div class="error">
  <img
    class="error__img"
    src="404.34db2e07.png"
    alt="#"
  />
  <small>illustration by Ouch.pics<b> https://icons8.com</b></small>
  <h1 class="error__title">No results found</h1>
  <p class="error__subtitle">
    Try different movie name
  </p>
</div>`
  elements.movies.innerHTML = markup
}
export const clearResult = () => {
  elements.movies.innerHTML = ''
}
export const renderPagination = (movieCount, limit, page) => {
  if (movieCount > limit) {
    elements.pagination.style.display = 'flex'
    const pageCount = Math.ceil(movieCount / limit)

    if (page == 1) {
      elements.paginationLeft.style.visibility = 'hidden'
    } else {
      elements.paginationLeft.style.visibility = 'visible'
    }
    if (page == pageCount) {
      elements.paginationRight.style.visibility = 'hidden'
    } else {
      elements.paginationRight.style.visibility = 'visible'
    }
  }
}
export const removePagination = () => {
  elements.pagination.style.display = 'none'
}
