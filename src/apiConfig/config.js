const fetcher = (...args) => fetch(...args).then((res) => res.json());

const api_key = "api_key=ada043aa1d13f140455aedd4ed18114f";
const endPoint = "https://api.themoviedb.org/3";

const imgUrl = (original = true, width = 400) => {
  if (!original) return `https://image.tmdb.org/t/p/w${width}/`;

  return "https://image.tmdb.org/t/p/original/";
};

const tmdbAPI = {
  getMovieListType: (type) => `${endPoint}/movie/${type}?${api_key}`,
  getMovieListGenre: () => `${endPoint}/genre/movie/list?${api_key}`,
  getMovieInfo: (movieID, type) =>
    `${endPoint}/movie/${movieID}/${type}?${api_key}`,
  getMovieDetails: (movieID) => `${endPoint}/movie/${movieID}?${api_key}`,
  getMovieVideo: (movieID) =>
    `${endPoint}/movie/${movieID}?${api_key}&append_to_response=videos`,
  getMovieQuery: (query, page) =>
    `${endPoint}/search/movie?${api_key}&query=${query}&page=${page}`,
  getMoviePopular: (page) =>
    `${endPoint}/movie/popular?${api_key}&language=en-US&page=${page}`,
};

export { fetcher, api_key, imgUrl, tmdbAPI };
