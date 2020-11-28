import React from 'react';
import Parser from "html-react-parser";

export function Item(props){
    return (
        <div className="movie" onClick={() => props.openMoreDetails(props.item.id)}>
            <div className="movie-image">
                <img alt="" src={props.item.image}/>
            </div>
            <h4>{Parser(props.item.title)}</h4>
        </div>
    )
}