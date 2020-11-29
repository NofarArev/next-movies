import React, {useEffect, useState} from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import {Movie} from "../../types/Movie";
import {Item} from "./Item";

export interface ListProps {
    items: Movie[];
    openMoreDetails(movieId: number): void;
}

export function List(props: ListProps) {
    const [page, setPage] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [props.items]);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setMoviesPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={props.items.length}
                rowsPerPage={moviesPerPage}
                labelRowsPerPage="Movies per page"
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <div className="movies">
                {
                    props.items.length == 0 ? <h3>Movie list is empty</h3> :
                        props.items.slice(page * moviesPerPage, page * moviesPerPage + moviesPerPage).map(item => {
                            return (<Item key={item.id} item={item} openMoreDetails={props.openMoreDetails}/>)
                        })
                }
            </div>

        </>
    )
}