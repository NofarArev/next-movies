import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export function FilterComponent(props) {
    const filterForm = useFormik({
        initialValues: {
            freeText: '',
            type: '',
            fromRating: 0,
            fromReleasedYear: null
        },
        onSubmit: (values) => {
            props.handleFilter(values);
        }
    });

    const types = ["Movie", "Series"];

    function handleClearFilters() {
        let initialValues = {
            freeText: '',
            type: '',
            fromRating: 0,
            fromReleasedYear: null
        };

        filterForm.setValues(initialValues);
        props.handleFilter(initialValues);
    }

    return (
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField name="freeText"
                               fullWidth
                               label="Free text"
                               value={props.freeText}
                               onChange={(event) => props.setFreeTextFilter(event.target.value)}
                               InputProps={{
                                   startAdornment: (<InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>)
                               }}/>
                </Grid>
                <Grid item xs={2}>
                    <InputLabel shrink>Type</InputLabel>
                    <Select name="type"
                            fullWidth
                            className="filter-type"
                            value={props.type}
                            onChange={(event) => props.setTypeFilter(event.target.value)}
                            displayEmpty>
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {
                            types.map(type => {
                                return (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    <TextField name="fromRating"
                               fullWidth
                               className="filter-rating"
                               label="From Rating"
                               type="number"
                               value={props.fromRating}
                               onChange={(event) => props.setFromRatingFilter(event.target.value)}
                               InputProps={{
                                   inputProps: {
                                       max: 10, min: 0, step: 0.1
                                   }
                               }}
                               InputLabelProps={{
                                   shrink: true,
                               }}/>
                </Grid>
                <Grid item xs={2}>
                    <KeyboardDatePicker name="fromReleasedYear"
                                        fullWidth
                                        disableToolbar
                                        views={["year"]}
                                        variant="inline"
                                        format="yyyy"
                                        label="From Year"
                                        maxDate={new Date()}
                                        value={props.fromYear}
                                        onChange={(date) => props.setFromYear(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}/>
                </Grid>
                <Grid item xs={2}>
                    <Button className="filter-btn" fullWidth variant="outlined" type="submit">
                        Apply filters
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button className="filter-btn" fullWidth variant="outlined" onClick={handleClearFilters}>
                        Clear filters
                    </Button>
                </Grid>
            </Grid>
    )
}