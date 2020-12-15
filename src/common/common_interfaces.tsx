export interface Person {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
    created: string;
    edited: string;
}

export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    vehicles: string[];
    characters: string[];
    planets: string[];
    url: string;
    created: string;
    edited: string;
}

export interface SwapiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Person[];
}

export const DEFAULT_PERSON: Person = {
    name: "",
    birth_year: "",
    eye_color: "",
    gender: "",
    hair_color: "",
    height: "",
    mass: "",
    skin_color: "",
    homeworld: "",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "",
    created: "",
    edited: "",
}

export const DEFAULT_SWAPI_RESPONSE: SwapiResponse = {
    count: -1,
    next: null,
    previous: null,
    results: [],
}