import React from 'react';
import { Person } from './common_interfaces';
import {PersonSummary} from './PersonSummary';

interface IProps {
    value: Person[];
}

export function ListPeople(props: IProps) {
    const people = props.value;
    return(
        <ul>
            {people.map(person => (
            <li>
                <PersonSummary value={person}/>
            </li>
            ))}
        </ul>
    );
}