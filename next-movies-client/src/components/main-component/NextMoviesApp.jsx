import React, {useEffect, useState} from "react";
import {getMovieById, getMovies} from "../../api-services/api-service";
import 'fontsource-roboto';
import {FilterComponent} from "../filter-component/FilterComponent";
import {MoreDetailsComponent} from "../more-details-component/MoreDetailsComponent";
import logo from '../../assets/next-movies-logo.png';
import {ListComponent} from "../list-component/ListComponent";

export function NextMoviesApp() {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const [freeTextFilter, setFreeTextFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [fromRatingFilter, setFromRatingFilter] = useState(0);
    const [fromYearFilter, setFromYear] = useState(null);

    useEffect(async () => {
        try {
            let movies = await getMovies();
            setAllMovies(movies.data);
            setFilteredMovies(movies.data);

        } catch (e) {
            alert("error occurred while trying to get data from server " + e);
        }

    }, []);

    useEffect(() => {
        handleFilter({
            freeText: freeTextFilter,
            fromReleasedYear: fromYearFilter,
            fromRating: fromRatingFilter,
            type: typeFilter
        })
    }, [freeTextFilter]);

    useEffect(() => {
        handleFilter({
            freeText: freeTextFilter,
            fromReleasedYear: fromYearFilter,
            fromRating: fromRatingFilter,
            type: typeFilter
        })
    }, [typeFilter]);

    useEffect(() => {
        handleFilter({
            freeText: freeTextFilter,
            fromReleasedYear: fromYearFilter,
            fromRating: fromRatingFilter,
            type: typeFilter
        })
    }, [fromRatingFilter]);

    useEffect(() => {
        handleFilter({
            freeText: freeTextFilter,
            fromReleasedYear: fromYearFilter,
            fromRating: fromRatingFilter,
            type: typeFilter
        })
    }, [fromYearFilter]);

    function handleFilter(values) {
        let allMoviesCopy = allMovies.slice();

        if (values.freeText) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.title.toLowerCase().includes(values.freeText.toLowerCase()) ||
                    movie.synopsis.toLowerCase().includes(values.freeText.toLowerCase()) ||
                    movie.rating.includes(values.freeText) ||
                    movie.type.toLowerCase().includes(values.freeText.toLowerCase()) ||
                    movie.released.toLowerCase().includes(values.freeText.toLowerCase())
            });
        }

        if (values.fromReleasedYear) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.released >= values.fromReleasedYear.getFullYear()
            })
        }

        if (values.fromRating > 0) {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.rating >= values.fromRating
            })
        }

        if (values.type !== "") {
            allMoviesCopy = allMoviesCopy.filter(movie => {
                return movie.type.toLowerCase() === values.type.toLowerCase()
            })
        }

        setFilteredMovies(allMoviesCopy);
    }

    async function openMoreDetails(movieId) {
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
                             freeText={freeTextFilter}
                             setFreeTextFilter={setFreeTextFilter}
                             type={typeFilter}
                             setTypeFilter={setTypeFilter}
                             fromRating={fromRatingFilter}
                             setFromRatingFilter={setFromRatingFilter}
                             fromYear={fromYearFilter}
                             setFromYear={setFromYear}/>
            <ListComponent items={filteredMovies} openMoreDetails={openMoreDetails}/>
            {
                selectedMovie &&
                <MoreDetailsComponent movie={selectedMovie} handleBackClick={handleCloseMoreDetails}/>
            }
        </div>
    )
}