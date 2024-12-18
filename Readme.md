Run:

- npm install
- npm run start
- http://localhost:3000/

# Usage:

- Page loads by making an api call to the fetch the episodes details.
- On successful fetching of details episodes are listed.
- The episode entry makes an api call to fetch the ratings.
- On successful fetching of the ratings data, ratings are displayed on the list.
- Sort Button: It toggles a dropdown displaying values by which the listing can be sorted.
- Search Bar: It filters the list based on the text entered, comparing it with the episode title.

- The page is responsive.
- The list converts to an accordian when the viewport is below 998px.
- The selected episode detail view opens below the episode listing.

# CSS:

- style.css to host the common css and define the global variables
- Each component has a seperate css file in the same level providing the required css.
  This approach is used to modularised the code and easy of accessibility.

# Unit Tests:

- Tests cases are written using react-testing-library and jest and located in **tests** folder
- npm run test - to run the tests

# Bundling:

- The code is bundled using webpack

# Hosting:

- The website is hosted on gh-pages at: [here](https://sanjitrane.github.io/Star-Wars/)
