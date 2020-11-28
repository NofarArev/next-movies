import React, {useEffect, useState} from 'react';
import {Item} from "./Item";
import TablePagination from "@material-ui/core/TablePagination";

export function ListComponent(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [props.items]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
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