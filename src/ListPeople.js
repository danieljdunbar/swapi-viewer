import PersonSummary from './PersonSummary';

function ListPeople(props) {
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