import { Component, OnInit } from '@angular/core';
import { GraphQLService } from '../graphql/graphql.service';
import { EChartsOption } from 'echarts';
import { colorType } from '../utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private service: GraphQLService,
  ) { }

  colors: { [key: string]: string } = colorType;

  getPokemonTypeCount: any[] = [];

  dataPokemonCountType: any[] = []; // Declaração da variável usada na função aplicaMudancas

  barChartsOptions: EChartsOption = {
    title: {
      text: 'Titulo',
      left: 'center',
      subtext: 'subtitulo'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          color: '#fff', // Corrigido: cor entre aspas
        },
      },
    ]
  };

  ngOnInit(): void {
    this.service.getPokemonTypesCount([1, 2, 3, 4, 5, 6, 7, 8, 9]).subscribe({
      next: (data) => {
        this.dataPokemonCountType = data;
        this.aplicaMudancas();
      }
    });
  }

  formaterBardata(data: any[]){
    const mappedData = data.map((type) => {
      return {
        value: pokemon_v2_pokemontypes_aggregate.aggregate ? .aggregate
      }
    })
  }

  aplicaMudancas() {
    // const seriesdata = this.dataPokemonCountType.sort(
    //   (a, b) => b.pokemon_v2_pokemontypes_aggregate.aggregate.count - a.pokemon_v2_pokemontypes_aggregate.aggregate.count
    // )

    this.barChartsOptions = {
      title: {
        text: 'Titulo',
        left: 'center',
        subtext: 'subtitulo'
      },
      xAxis: {
        type: 'category',
        data: this.dataPokemonCountType.map(e => e.name)
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        show: true,
        formatter: '{b}: <',
      },
      series: [
        {
          data: this.dataPokemonCountType.map(e => e.pokemon_v2_pokemontypes_aggregate.aggregate.count),
          type: 'bar',
          itemStyle: {
            color: this.colors['someColorKey'] || '#f0f', // Exemplo de uso de cor do colorType
          },
        },
      ]
    };
  }
}
