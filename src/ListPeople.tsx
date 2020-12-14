import PersonSummary from './PersonSummary';
import React from 'react';
import { Person } from './common_interfaces';

interface IProps {
    value: Person[];
}

function ListPeople(props: IProps) {
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

export default ListPeople;