import axios from 'axios';
import  React from 'react';

let serverUrl = process.env.REACT_APP_SERVER_URL;

export function getMovies(){
    return axios.get(serverUrl + "/movies");
}

export function getMovieById(movieId){
    return axios.get(serverUrl + "/movies/" + movieId);
}