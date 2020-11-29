import React, {useEffect, useState} from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import {Movie} from "../../models/Movie";
import {Item} from "./Item";

export interface ListComponentProps {
    items: Movie[];

    openMoreDetails(movieId: number): void;
}

export function ListComponent(props: ListComponentProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [props.items]);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className="movies">
                {
                    props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                        return (<Item item={item} openMoreDetails={props.openMoreDetails}/>)
                    })
                }
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={props.items.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Movies per page"
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}