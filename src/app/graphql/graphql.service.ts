import { Injectable } from '@angular/core';
import { 
  GetTypesGQL,
  GetPokemonCountByGenerationGQL,
  GetPokemonTypesCountGQL,
  GetGenerationsGQL,
  GetPokemonsStatsByTypeGQL, 
  GetStatsGQL, 
  GetTypeEffectivenessGQL,
  GetPokemonTypeCountsByGenerationGQL,
  GetPokemonMovesClassesCountGQL,
  GetPokemonsGQL,
  GetPokemonStatsGQL,
} from '../graphql/generated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {

  constructor(
    private getTypesGQL: GetTypesGQL,
    private getPokemonCountByGenerationGQL: GetPokemonCountByGenerationGQL,
    private getPokemonTypesCountGQL: GetPokemonTypesCountGQL,
    private getStatsGQL: GetStatsGQL,
    private getPokemonsStatsByTypeGQL: GetPokemonsStatsByTypeGQL,
    private getTypeEffectivenessGQL: GetTypeEffectivenessGQL,
    private getGenerationsGQL: GetGenerationsGQL,
    private getPokemonTypeCountsByGenerationGQL: GetPokemonTypeCountsByGenerationGQL,
    private getPokemonMovesClassesCountGQL: GetPokemonMovesClassesCountGQL,
    private getPokemonsGQL: GetPokemonsGQL,
    private getPokemonStatsGQL: GetPokemonStatsGQL,
  ) {}

  getTypes(): Observable<any> {
    return this.getTypesGQL.fetch({}, { fetchPolicy: 'network-only' })
      .pipe(
        map((result) => result.data.pokemon_v2_type || [])
    );
  }

  getPokemonCountByGeneration(): Observable<any> {
    return this.getPokemonCountByGenerationGQL.fetch({}, { fetchPolicy: 'network-only' }).
      pipe(
        map((result) => result.data.pokemon_v2_generation || [])
      );
  }
  
  getPokemonTypesCount(generation_ids?: number[]): Observable<any> {
    return this.getPokemonTypesCountGQL.fetch({ generation_ids }, { fetchPolicy: 'network-only' })
      .pipe(
        map((result) => result.data.pokemon_v2_type || [])
    );
  }

  getGenerations(): Observable<any> {
    return this.getGenerationsGQL.fetch({}, {fetchPolicy: 'network-only'})
      .pipe(
        map((result) => result.data.pokemon_v2_generation || [])
      );
  }

  getStats(): Observable<any> {
    return this.getStatsGQL.fetch({}, { fetchPolicy: 'network-only' })
      .pipe(
        map(result => result.data.pokemon_v2_stat || [])
      );
  }

  getPokemonsStatsByType(stat_name: string, generation_ids?: number[]): Observable<any> {
    return this.getPokemonsStatsByTypeGQL.fetch({stat_name: stat_name, generation_ids}, { fetchPolicy: 'network-only' })
      .pipe(
        map(result => result.data.pokemon_v2_type || [])
      );
  }

  getTypeEffectiveness(generation_ids?: number[]): Observable<any> {
    return this.getTypeEffectivenessGQL.fetch({ generation_ids }, { fetchPolicy: 'network-only' })
    .pipe(
      map(result => result.data.pokemon_v2_type || [])
    );
  }

  getPokemonTypeCountsByGeneration(generation_ids: number[]): Observable<any> {
    const g_ids = generation_ids;
    const p_id = generation_ids[generation_ids.length - 1] - 1;
    return this.getPokemonTypeCountsByGenerationGQL.fetch(
      { generation_ids: g_ids, previous_generation_id: p_id }, 
      { fetchPolicy: 'network-only' })
      .pipe(
        map(result => result.data || [])
      );
  }

  getPokemonMovesClassesCount(
    generationId: number,
    pokemonName: string
  ): Observable<any> {
    return this.getPokemonMovesClassesCountGQL
      .fetch(
        {
          generation_id: generationId,
          pokemon_name:
            pokemonName.charAt(0).toLowerCase() + pokemonName.slice(1),
        },
        {
          fetchPolicy: 'network-only',
        }
      )
      .pipe(map((result) => result.data));
  }

  getPokemons(limit: number = 10) {
    return this.getPokemonsGQL
      .fetch({ limit: limit }, { fetchPolicy: 'network-only' })
      .pipe(map((result) => result.data.pokemon_v2_pokemon));
  }

  getPokemonStats(names: string[]): Observable<any> {
    return this.getPokemonStatsGQL
      .fetch({ names: names }, { fetchPolicy: 'network-only' })
      .pipe(map((result) => result.data.pokemon_v2_pokemon || []));
  }
}
