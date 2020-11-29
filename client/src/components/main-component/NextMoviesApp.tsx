import React, {useEffect, useState} from "react";
import 'fontsource-roboto';
import {FilterComponent} from "../filter-component/FilterComponent";
import {MoreDetailsComponent} from "../more-details-component/MoreDetailsComponent";
import logo from "../../assets/next-movies-logo.png";
import {ListComponent} from "../list-component/ListComponent";
import {Movie} from "../../models/Movie";
import {getMovieById, getMovies} from "../../services/api-service";
import {Criteria} from "../../models/Criteria";

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
        handleFilter({
            freeText: freeText,
            fromReleasedYear: fromReleasedYear,
            fromRating: fromRating,
            type: type
        })
    }, [freeText, type, fromReleasedYear, fromRating]);

    function handleFilter(criteria: Criteria) {
        let allMoviesCopy = allMovies.slice();

        if (criteria.freeText) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.title.toLowerCase().includes(criteria.freeText.toLowerCase()) ||
                    movie.synopsis.toLowerCase().includes(criteria.freeText.toLowerCase()) ||
                    movie.rating.toString().includes(criteria.freeText) ||
                    movie.type.toLowerCase().includes(criteria.freeText.toLowerCase()) ||
                    movie.released.toString().toLowerCase().includes(criteria.freeText.toLowerCase())
            });
        }

        if (criteria.fromReleasedYear) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.released >= criteria.fromReleasedYear!.getFullYear()
            })
        }

        if (criteria.fromRating) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.rating >= criteria.fromRating!
            })
        }

        if (criteria.type) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.type.toLowerCase() === criteria.type.toLowerCase()
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
            <FilterComponent handleFilter={handleFilter}
                             freeText={freeText}
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