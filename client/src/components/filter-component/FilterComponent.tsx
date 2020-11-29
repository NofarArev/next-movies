import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Criteria} from "../../models/Criteria";

export interface FilterComponentProps {
    freeText: string;

    setFreeText(value: string): void;

    type: string

    setType(value: string): void;

    fromRating: number | null;

    setFromRating(value: number | null): void;

    fromReleasedYear: Date | null;

    setFromReleasedYear(value: Date | null): void;

    handleFilter(criteria: Criteria): void;
}

export function FilterComponent(props: FilterComponentProps) {
    const types = ["Movie", "Series"];

    function handleClearFilters() {
        props.setFreeText('');
        props.setType('');
        props.setFromRating(null);
        props.setFromReleasedYear(null);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <TextField name="freeText"
                           fullWidth
                           label="Free text"
                           value={props.freeText}
                           onChange={(event) => props.setFreeText(event.target.value)}
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
                        onChange={(event: any) => props.setType(event.target.value)}
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
                           error={props.fromRating && props.fromRating! < 0 || props.fromRating! > 10}
                           value={props.fromRating}
                           onChange={(event: any) => props.setFromRating(event.target.value)}
                           InputProps={{
                               inputProps: {
                                   max: 10, min: 0, step: 0.1
                               }
                           }}
                           InputLabelProps={{
                               shrink: true,
                           }}/>
            </Grid>
            <Grid item xs={3}>
                <KeyboardDatePicker name="fromReleasedYear"
                                    fullWidth
                                    disableToolbar
                                    views={["year"]}
                                    variant="inline"
                                    format="yyyy"
                                    label="From Year"
                                    maxDate={new Date()}
                                    value={props.fromReleasedYear}
                                    onChange={(date) => props.setFromReleasedYear(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}/>
            </Grid>
            <Grid item xs={2}>
                <Button className="filter-btn" fullWidth variant="outlined" onClick={handleClearFilters}>
                    Clear filters
                </Button>
            </Grid>
        </Grid>
    )
}