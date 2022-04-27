# FikaSearch Exercise

The objective of this exercise is to fork this repository and create a `react-native` app called 'FikaSearch'. This app will comprise of a listing page of films and the names of their genres. The page should also allow the user to search the films by typing into a text field.

We expect you to have an understandable structure, clean code, and to be able to describe your next steps in any aspects of the challenge you arent able to complete in a few of hours.

## Technical details

### API

You will need to use the following URLs to fetch the films and genres from `the movie db` API:

movies - [https://api.themoviedb.org/3/discover/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1&include_adult=false](https://api.themoviedb.org/3/discover/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1&include_adult=false)

movies search - [https://api.themoviedb.org/3/search/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1&include_adult=false&query=searchterm](https://api.themoviedb.org/3/search/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1&include_adult=false&query=shrek)

genres - [https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US](https://developers.themoviedb.org/3/genres/get-movie-list)

#### Images

The API will provide part of the image url via the `poster_path` field of each film. It must be combined with the base image path `https://image.tmdb.org/t/p/w500/`

**Have fun!**

# Setup

### `cp .env.example .env`

### `npm start`

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Future developments
- Add routing so users can get back to page/expanded modal via URL
- Better error handling
- Add more tests
- Add more filters
- Add sort by
- Look at adding page size select
- Cleaner UI
- Faviocon + Logo
- SEO
