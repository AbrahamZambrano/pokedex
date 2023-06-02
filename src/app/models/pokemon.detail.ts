//Class to store the details of the pokemon
export class PokemonDetail {
    id: number;
    order: number;
    name: string;
    height: number;
    abilities: Ability[];
    spices: Species;
    types: Type[];
    weight: number;
    sprites: Sprite;
    stats: Stat[];

    constructor() {
        this.abilities  = [];
        this.types = [];
    }
}

//Class to store the Ability of the pokemon
class Ability  {
    ability: {
        name: string;
    }

    constructor() {

    }
}

//Class to store the Species of the pokemon
class Species {
    url: string;
}

//Class to store the Type of the pokemon
class Type {
    slot: number;
    type: {
        name: string;
    }
}

//Class to store the Sprite of the pokemon
class Sprite {
    front_default: string;
}

//Class to store the Stat of the pokemon
class Stat {
    base_stat: number;
    stat: {
        name: string;
    }
}