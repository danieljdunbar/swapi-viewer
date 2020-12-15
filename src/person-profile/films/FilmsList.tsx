import React from 'react';
import { Film } from '../../common_interfaces';

interface IProps {
    films: Film[];
}

export default function PersonProfile(props: IProps) {
    return (
        <div>
            <h2>Films</h2>
            {props.films.map(film => <div>{film.title}</div>)}
        </div>
    )
}