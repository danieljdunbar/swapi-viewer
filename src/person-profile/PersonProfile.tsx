import React from 'react';
import { useSelector } from 'react-redux';
import { selectPerson } from '../redux/PersonSlice';
import { Paper } from '@material-ui/core';

export default function PersonProfile () {
    const selectedPerson = useSelector(selectPerson);

    return (
        <section>
            <div>
                <Paper className="swapi-header">{selectedPerson.name}</Paper>
            </div>
        </section>
    )
} 