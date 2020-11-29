import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Parser from "html-react-parser";
import Button from "@material-ui/core/Button";
import {Movie} from "../../models/Movie";

export interface MoreDetailsComponentProps {
    movie: Movie;

    handleBackClick(): void;
}

export function MoreDetailsComponent(props: MoreDetailsComponentProps) {
    return (
        <Dialog fullScreen open={true} onClose={props.handleBackClick}>
            <AppBar>
                <Toolbar>
                    <Button className="backBtn" color="inherit" onClick={props.handleBackClick} aria-label="close">
                        <ArrowBackIcon/> Back to All
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="more-info-content">
                <span className="movie-details-content">
                    <img src={props.movie.largeimage} alt=""/>
                </span>
                <div className="details">
                    <Typography variant="h6">
                        <b>{Parser(props.movie.title)}</b>
                    </Typography>
                    <Typography>
                        {props.movie.released + " | " + props.movie.runtime + (props.movie.rating ? (" | " + props.movie.rating + "/10") : "")}
                    </Typography>
                    <br/>
                    <Typography className="synopsis">
                        {Parser(props.movie.synopsis)}
                    </Typography>
                </div>
            </div>
        </Dialog>
    )
}