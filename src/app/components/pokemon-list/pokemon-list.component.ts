import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from '../../models/pokemon.detail';
import { PokemonList } from '../../models/pokemon.list';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  //save the list of pokemons
  search: FormControl = new FormControl('');
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = true;

  //save the offset to get the next page
  private offset: number;
  isLoading: boolean;
  isLastPage = false;

  //save the pokemon to search
  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;

  //inject the pokemon service
  constructor(private pokemonService: PokemonService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) { 
                this.offset = 0 ;
              }

  ngOnInit(): void {
    this.getPage(this.offset);
  }

  //get the next page of pokemons
  getPage(offset: number) {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getPokemonList(offset)
      .subscribe((list: PokemonList[]) => {
        if(list.length === 0) {
          this.isLastPage = true;
        }
        //get the pokemon detail
        if(!this.isLastPage) {
          this.getPokemon(list);
        }
      });
    }
  }

  //search a pokemon
  onSearchPokemon(): void {
    const value = this.search.value;
    if(value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(value)
      .subscribe((pokemon: PokemonDetail) => {
        this.searchPokemon = pokemon;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if(error.status === 404) {
          this.snackBar.open('Sorry, Pokemon not found', 'Ok', {
            duration: 5000,
          });
        }
      })
    }
  }

  //get the next page of pokemons  
  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  //get the pokemon detail
  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });

//forkjoin to get the list of pokemons
//forkJoin waits for each HTTP request to complete and group's all the observables returned by each HTTP call into a single observable array and finally return that observable array.
//forkJoin is used to run multiple HTTP requests in parallel and wait till all the requests are completed.

    forkJoin([...arr]).subscribe((pokemons: []) => {
      this.pokemons.push(...pokemons);
      this.offset +=20;
      this.isLoading = false;
    })
  }

  //get the pokemon type
  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

  //open the pokemon detail
  onDetail(pokemon: PokemonDetail): void {
    this.bottomSheet.open(PokemonDetailComponent, {
      data: {pokemon, classicMode: this.classicMode}
    })
  }

}
