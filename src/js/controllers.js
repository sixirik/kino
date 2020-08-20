import Search from './model/Search'
import * as searchView from './view/SearchView'
import { elements, renderSpinner, removeSpinner } from './view/base'

// Default params
let state = {
  page: 1, // Current page
  limit: 18, // Movies per page
}
// Reset state params to default values
const resetParams = (State) => {
  State.page = 1
  State.genre = '' // Current genre
  State.movieQuery = '' // Current query
}
/*
 
   ____                      _        ____            _             _ _            
  / ___|  ___  __ _ _ __ ___| |__    / ___|___  _ __ | |_ _ __ ___ | | | ___ _ __  
  \___ \ / _ \/ _` | '__/ __| '_ \  | |   / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__| 
   ___) |  __/ (_| | | | (__| | | | | |__| (_) | | | | |_| | | (_) | | |  __/ |    
  |____/ \___|\__,_|_|  \___|_| |_|  \____\___/|_| |_|\__|_|  \___/|_|_|\___|_|    
                                                                                   
 
*/
const controllerSearch = async () => {
  // Declare the new movie Search
  state.search = new Search(state.movieQuery, state.genre)
  // Remove pagination when we fetching data
  searchView.removePagination()
  // Render loading spinner when we fetching data
  renderSpinner()
  try {
    // Requesting movie list on specific page
    await state.search.findMovies(state.page, state.limit)
    // If success - render results
    searchView.renderResults(state.search.movies)
    // Render pagination if movies array more then limit
    searchView.renderPagination(
      state.search.movieCount,
      state.limit,
      state.page
    )
    // Clean spinner
    removeSpinner()
  } catch (error) {
    // If no movies found - render 404 block
    searchView.renderError()
    //Clean spinner
    removeSpinner()
    // Log the error
    console.error(error)
  }
}
/*
 
   _____                 _        
  | ____|_   _____ _ __ | |_ ___  
  |  _| \ \ / / _ \ '_ \| __/ __| 
  | |___ \ V /  __/ | | | |_\__ \ 
  |_____| \_/ \___|_| |_|\__|___/ 
                                  
 
*/
// When page is load
document.addEventListener('DOMContentLoaded', () => {
  resetParams(state)
  controllerSearch()
})
// When user submit value in the input field
elements.searchForm.addEventListener('submit', (event) => {
  resetParams(state)
  event.preventDefault()
  // Get input form input field
  state.movieQuery = searchView.getInput()

  // Clean after yourself ! 🧽
  searchView.clearInput()
  searchView.clearResult()

  controllerSearch()
})
// When user click on genre buttons
elements.genre.addEventListener('click', (event) => {
  resetParams(state)
  state.genre = event.target.dataset.genre
  searchView.clearResult()
  controllerSearch()
})

// Pagination

//When left button is pressed - go backward ⬅
elements.paginationLeft.addEventListener('click', () => {
  if (state.page > 1) {
    searchView.clearResult()
    state.page--
    controllerSearch()
  }
})

//When right button is pressed - go forward ➡
elements.paginationRight.addEventListener('click', () => {
  searchView.clearResult()
  state.page++
  controllerSearch()
})

elements.movies.addEventListener('click', (event) => {
  let id
  if (event.target != null) {
    id = event.target.closest('.movie').dataset.id
    state.search.movies.filter((x) => {
      if (x.id == id) window.location.assign(x.torrents[1].url)
    })
  }
})
