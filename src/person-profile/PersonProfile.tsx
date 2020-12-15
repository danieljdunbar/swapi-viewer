import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { selectPerson } from '../redux/PersonSlice';
import { Paper } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Film } from '../common_interfaces';
import FilmsList from './films/FilmsList';
import './PersonProfile.css';

type ActionType = 'addResult'|'addError';

interface PageAction {
    type: ActionType;
    film?: Film;
    error?: Error;
}

interface PageState {
    errors: Error[];
    isLoaded: boolean;
    targetSize: number;
    results: Film[];
}

function reducer(state: PageState, action: PageAction): PageState {
    switch(action.type) {
        case 'addResult':
            if (action.film){

                const updatedResults: Film[] = state.results.slice();
                updatedResults.push(action.film);
                const loaded = state.isLoaded || updatedResults.length === state.targetSize;
                return {
                    ...state,
                    isLoaded: loaded,
                    results: updatedResults,
                }
            }

            break;
        case 'addError':
            if (action.error){
                const updatedErrors: Error[] = state.errors.slice();
                updatedErrors.push(action.error);
                return {
                    ...state,
                    isLoaded: true,
                    errors: updatedErrors,
                }
            }

            break;
    }


    return state;
}

export default function PersonProfile () {
    const selectedPerson = useSelector(selectPerson);
    const initialState = {errors: [], isLoaded: false, targetSize: selectedPerson.films.length, results: []};
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        for (let filmUrl of selectedPerson.films) {
            fetch(filmUrl)
                .then(res => res.json())
                .then(
                    (result) => {
                        const response:Film = JSON.parse(JSON.stringify(result));
                        dispatch({type: 'addResult', film: response});
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        dispatch({type: 'addResult', error});
                    }
                );
        }
    }, []);

    if (state.errors.length > 0) {
        return (
            <div>
                Error(s):
                {state.errors.map(error => (
                    <div>{error.message}</div>
                ))}
            </div>
            
        );
    } else if (!state.isLoaded) {
        return (
            <div className="loading-container">
                <CircularProgress />
            </div>
        );
    } else {
        return (
            <div>
                <Paper className="person-header">{selectedPerson.name}</Paper>
                <div className="person-details">
                    <div>Birth Year: {selectedPerson.birth_year}</div>
                    <div>Eye Color: {selectedPerson.eye_color}</div>
                    <div>Gender: {selectedPerson.gender}</div>
                    <div>Hair Color: {selectedPerson.hair_color}</div>
                    <div>Height: {selectedPerson.height}</div>
                    <div>Mass: {selectedPerson.mass}</div>
                    <div>Skin Color: {selectedPerson.skin_color}</div>
                </div>
                <FilmsList films={state.results} />
            </div>
        );
    }
}