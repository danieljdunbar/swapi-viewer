import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { Person } from './common_interfaces';
import { PersonSummary } from './PersonSummary';
import './ListPeople.css';

interface IProps {
    people: Person[];
    isLoaded: boolean;
}

export function ListPeople(props: IProps) {
    if (props.isLoaded) {
        return (
            <div className="people-container">
                <Grid
                        container
                        spacing={2}
                        alignItems="stretch"
                        justify="space-around"
                        key="people-grid">
                    {props.people.map(person => (
                        <PersonSummary person={person} />
                    ))}

                </Grid>
            </div>
        );
    } else {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        );
    }
}