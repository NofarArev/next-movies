import React, {useEffect, useState} from "react";
import 'fontsource-roboto';
import {FilterComponent} from "../filter-component/FilterComponent";
import {MoreDetailsComponent} from "../more-details-component/MoreDetailsComponent";
import logo from "../../assets/next-movies-logo.png";
import {ListComponent} from "../list-component/ListComponent";
import {Movie} from "../../models/Movie";
import {getMovieById, getMovies} from "../../services/api-service";

export function NextMoviesApp() {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();
    const [freeText, setFreeText] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [fromRating, setFromRating] = useState<number | null>(null);
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
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.title.toLowerCase().includes(freeText.toLowerCase()) ||
                    movie.synopsis.toLowerCase().includes(freeText.toLowerCase()) ||
                    movie.rating.toString().includes(freeText) ||
                    movie.type.toLowerCase().includes(freeText.toLowerCase()) ||
                    movie.released.toString().toLowerCase().includes(freeText.toLowerCase())
            });
        }

        if (fromReleasedYear) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.released >= fromReleasedYear!.getFullYear()
            })
        }

        if (fromRating) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.rating >= fromRating!
            })
        }

        if (type) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.type.toLowerCase() === type.toLowerCase()
            })
        }

        setFilteredMovies(allMoviesCopy);
    }

    async function openMoreDetails(movieId: number) {
        try {
            let movie = await getMovieById(movieId);
            setSelectedMovie(movie.data[0]);
        } catch (e) {
            alert("error occurred while trying to get data from server " + e);
        }
    }

    function handleCloseMoreDetails() {
        setSelectedMovie(undefined);
    }

    return (
        <div className="main-comp">
            <img className="logo" src={logo} alt=""/>
            <FilterComponent freeText={freeText}
                             setFreeText={setFreeText}
                             type={type}
                             setType={setType}
                             fromRating={fromRating}
                             setFromRating={setFromRating}
                             fromReleasedYear={fromReleasedYear}
                             setFromReleasedYear={setFromReleasedYear}/>
            <ListComponent items={filteredMovies} openMoreDetails={openMoreDetails}/>
            {
                selectedMovie &&
                <MoreDetailsComponent movie={selectedMovie} handleBackClick={handleCloseMoreDetails}/>
            }
        </div>
    )
}