import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PokemonList } from "../models/pokemon.list";
import { PokemonDetail } from "../models/pokemon.detail";
import { map } from "rxjs/operators";

// Service to get the list of pokemons and details of the pokemon
@Injectable({providedIn: 'root'})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/';
    
    constructor(private http: HttpClient) { }

// Method to get the list of pokemons
    getPokemonList(offset: number, limit: number = 20) : Observable<PokemonList[]> {
        return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit)
        //The map operator is used to transform the data from the API to the format we need
        .pipe(
            map((x: any) => x.results)
        );
    }
// Method to get the details of the pokemon
    getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
    }
    
}

//.pipe is used to transform the data from the API to the format we need
//.pipe is a simmple function to accept an imput value and return a transformed value