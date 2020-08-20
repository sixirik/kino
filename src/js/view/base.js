export const elements = {
  searchForm: document.querySelector('.search'),
  searchField: document.querySelector('.search__field'),
  movies: document.querySelector('.movies'),
  pagination: document.querySelector('.pagination'),
  paginationLeft: document.querySelector('.pagination__left'),
  paginationRight: document.querySelector('.pagination__right'),
  genre: document.querySelector('.genre'),
}
export const renderSpinner = () => {
  let spinner = document.createElement('div')
  spinner.className = 'spinner'
  elements.movies.appendChild(spinner)
}
export const removeSpinner = () => {
  const loader = document.querySelector('.spinner')
  elements.movies.removeChild(loader)
}
