import React, {useEffect, useState} from "react";
import 'fontsource-roboto';
import {Filter} from "../filter/Filter";
import {MoreDetails} from "../more-details/MoreDetails";
import logo from "../../assets/next-movies-logo.png";
import {List} from "../list/List";
import {Movie} from "../../types/Movie";
import {getMovieById, getMovies} from "../../services/api-service";

export function NextMoviesApp() {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();
    const [freeText, setFreeText] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [fromRating, setFromRating] = useState<number>(0);
    const [fromReleasedYear, setFromReleasedYear] = useState<Date | null>(null);

    useEffect(() => {
        (async () => {
            try {
                let movies = await getMovies();
                setAllMovies(movies.data);
                setFilteredMovies(movies.data);
            } catch (e) {
                alert("error occurred while trying to get data from server " + e);
            }
        })();


    }, []);

    useEffect(() => {
        handleFilter();
    }, [freeText, type, fromReleasedYear, fromRating]);

    function handleFilter() {
        let allMoviesCopy = allMovies.slice();

        if (freeText) {
            allMoviesCopy = filterByFreeText(allMoviesCopy);
        }

        if (fromReleasedYear) {
            allMoviesCopy = filterByReleasedYear(allMoviesCopy)
        }

        if (fromRating) {
            allMoviesCopy = filterByFromRating(allMoviesCopy);
        }

        if (type) {
            allMoviesCopy = filterByFromReleasedYear(allMoviesCopy);
        }

        setFilteredMovies(allMoviesCopy);
    }

    function filterByFreeText(allMoviesCopy: Movie[]){
        return allMoviesCopy.filter(movie => {
            return movie.title.toLowerCase().includes(freeText.toLowerCase()) ||
                movie.synopsis.toLowerCase().includes(freeText.toLowerCase()) ||
                movie.rating.toString().includes(freeText) ||
                movie.type.toLowerCase().includes(freeText.toLowerCase()) ||
                movie.released.toString().toLowerCase().includes(freeText.toLowerCase())
        });
    }

    function filterByReleasedYear(allMoviesCopy: Movie[]){
        return allMoviesCopy.filter(movie => {
            return movie.released >= fromReleasedYear!.getFullYear()
        })
    }

    function filterByFromRating(allMoviesCopy: Movie[]){
        return allMoviesCopy.filter(movie => {
            return movie.rating >= fromRating!
        })
    }

    function filterByFromReleasedYear(allMoviesCopy: Movie[]){
        return allMoviesCopy.filter(movie => {
            return movie.type.toLowerCase() === type.toLowerCase()
        })
    }

    async function openMoreDetails(movieId: number) {
        try {
            let movie = await getMovieById(movieId);
            setSelectedMovie(movie.data[0]);
        } catch (e) {
            alert("error occurred while trying to get data from server " + e);
        }
    }

    function closeMoreDetails() {
        setSelectedMovie(undefined);
    }

    return (
        <div className="main-comp">
            <img className="logo" src={logo} alt=""/>
            <Filter freeText={freeText}
                    setFreeText={setFreeText}
                    type={type}
                    setType={setType}
                    fromRating={fromRating}
                    setFromRating={setFromRating}
                    fromReleasedYear={fromReleasedYear}
                    setFromReleasedYear={setFromReleasedYear}/>
            <List items={filteredMovies} openMoreDetails={openMoreDetails}/>
            {
                selectedMovie &&
                <MoreDetails movie={selectedMovie} handleBackClick={closeMoreDetails}/>
            }
        </div>
    )
}