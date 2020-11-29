import React from 'react';
import Parser from "html-react-parser";
import {Movie} from "../../types/Movie";

export interface ItemProps {
    openMoreDetails(movieId: number): void;
    item: Movie;
}

export function Item(props: ItemProps) {
    return (
        <div className="movie" onClick={() => props.openMoreDetails(props.item.id)}>
            <div className="movie-image-div">
                <img className="movie-image" alt="" src={props.item.image}/>
            </div>
            <span><b>{Parser(props.item.title)}</b></span>
        </div>
    )
}