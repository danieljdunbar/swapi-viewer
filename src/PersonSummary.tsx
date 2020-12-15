import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Button, Grid } from '@material-ui/core';
import { Person } from './common_interfaces';
import { replacePerson } from './redux/PersonSlice';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import './PersonSummary.css';

interface IProps {
    person: Person;
}

export function PersonSummary(props: IProps) {
    const dispatch = useDispatch();

    return (
        <Grid 
                className="grid-item" 
                item 
                sm={4}
                key={props.person.name}>
            <Card 
                    variant="outlined"
                    className="person-card">
                <CardHeader title={props.person.name} />
                <CardContent>
                    <div>Birth Year: {props.person.birth_year}</div>
                    <div>Eye Color: {props.person.eye_color}</div>
                    <div>Gender: {props.person.gender}</div>
                    <div>Hair Color: {props.person.hair_color}</div>
                    <div>Height: {props.person.height}</div>
                    <div>Mass: {props.person.mass}</div>
                    <div>Skin Color: {props.person.skin_color}</div>
                </CardContent>
                <CardActions>
                    <Button 
                            type="button" 
                            component={Link} 
                            to={'/' + props.person.name}
                            onClick={() => dispatch(replacePerson(props.person))}>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}