import axios from 'axios';

let serverUrl = process.env.REACT_APP_SERVER_URL;

export function getMovies() {
    return axios.get(serverUrl + "/movies");
}

export function getMovieById(movieId: number) {
    return axios.get(serverUrl + "/movies/" + movieId);
}