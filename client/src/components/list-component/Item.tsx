import React from 'react';
import Parser from "html-react-parser";
import {Movie} from "../../models/Movie";

export interface ItemProps {
    openMoreDetails(movieId: number): void;

    item: Movie;
}

export function Item(props: ItemProps) {
    return (
        <div className="movie" onClick={() => props.openMoreDetails(props.item.id)}>
            <div className="movie-image">
                <img alt="" src={props.item.image}/>
            </div>
            <h4>{Parser(props.item.title)}</h4>
        </div>
    )
}