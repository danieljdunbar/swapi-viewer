import React from 'react';
import { Grid } from '@material-ui/core';
import { Film } from '../../common/common_interfaces';
import FilmSummary from './FilmSummary';
import './ListFilms.css'

interface IProps {
    films: Film[];
}

export default function ListFilms(props: IProps) {
    return (
        <div className="films-container">
            <h2>Films</h2>
            <Grid
                container
                spacing={2}
                alignItems="stretch"
                justify="space-between"
                key="people-grid">
                {props.films.map(film => (
                    <FilmSummary film={film} />
                ))}
            </Grid>
        </div>
    )
}