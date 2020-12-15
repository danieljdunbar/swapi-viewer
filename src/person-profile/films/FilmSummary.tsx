import React from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { Film } from '../../common/common_interfaces';
import './FilmSummary.css';

interface IProps {
    film: Film;
}

export default function FilmSummary(props: IProps) {
    return (
        <Grid 
                className="grid-item" 
                item 
                sm={4}
                key={props.film.title}>
            <Card 
                    variant="outlined"
                    className="film-card">
                <CardHeader title={props.film.title} />
                <CardContent>
                    <div className="opening-crawl">{props.film.opening_crawl}</div>
                    <div>Director: {props.film.director}</div>
                    <div>Producer: {props.film.producer}</div>
                    <div>Release Date: {props.film.release_date}</div>
                </CardContent>
            </Card>
        </Grid>
    );
}