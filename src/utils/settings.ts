/**All hard-coded info can be stored here and utilised in the project */
const IMG_BASE_PATH = "./assets";

export const settings = {
  logo: `${IMG_BASE_PATH}/star-wars.svg`,
  searchIcon:`${IMG_BASE_PATH}/search.svg`,
  starOutlined:`${IMG_BASE_PATH}/star-outline.svg`,
  starFilled:`${IMG_BASE_PATH}/star-fill.svg`,
  maxRating: 10,
  episodesApiURI: 'https://swapi.py4e.com/api/films/?format=json',
  omdbApiURI:'https://www.omdbapi.com/',
  sortConfig:[
    {name:'Episode', value:'episode_id'},
    {name:'Year', value:'release_date'},
    {name: 'Rating', value: 'imdbRating'}
  ]
  
}