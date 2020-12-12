function PersonSummary(props) {
    const person = props.value;

    return (
        <div>
            <div>Name: {person.name}</div>
            <div>Birth Year: {person.birth_year}</div>
            <div>Eye Color: {person.eye_color}</div>
            <div>Gender: {person.gender}</div>
            <div>Hair Color: {person.hair_color}</div>
            <div>Height: {person.height}</div>
            <div>Mass: {person.mass}</div>
            <div>Skin Color: {person.skin_color}</div>
        </div>);
}

export default PersonSummary;