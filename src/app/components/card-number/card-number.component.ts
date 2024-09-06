import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-card-number',
  templateUrl: './card-number.component.html',
  styleUrls: ['./card-number.component.scss']
})
export class CardNumberComponent implements OnInit {
  @Input() value: number = 0;
  @Input() title: string = '';
  @Input() backgroundColor: string = '#FFFFFF';
  @Input() valueColor: string = '#0000FF';
  @Input() titleColor: string = '#0000FF';
  @Input() borderRadius: number = 10;
  @Input() boxShadow: string = '0 4px 8px rgba(0, 0, 0, 0.1)';
  @Input() dividerColor: string = '#d9d9d9';
  @Input() cardHeight: string = '200px';

  constructor() { }

  public kpiCardOption: EChartsOption = {};

  ngOnInit(): void {
    this.setupChartOptions();
  }

  setupChartOptions(): void {
    this.kpiCardOption = {
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        min: 0,
        max: 100
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      series: [{
        type: 'custom',
        renderItem: (params, api) => {
          const width = api.getWidth();  
          const height = api.getHeight(); 
          const size = Math.min(width, height); 
      
          const padding = size * 0.06;
          const rectSize = size - 2 * padding;
      
          const xPos = (width - rectSize) / 2; 
          const yPos = (height - rectSize) / 2; 
      
          return {
            type: 'group',
            children: [
              {
                type: 'rect',
                shape: {
                  x: xPos, 
                  y: yPos, 
                  width: rectSize,
                  height: rectSize,
                  r: this.borderRadius  // Bordas arredondadas
                },
                style: {
                  fill: this.backgroundColor,  // Cor de fundo
                  stroke: '#d9d9d9',  // Borda
                  lineWidth: 1,
                  shadowBlur: 15,
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                }
              },
              {
                type: 'text',
                style: {
                  text: this.title,
                  x: xPos + rectSize / 2,
                  y: yPos + rectSize * 0.2, // Posição vertical do título
                  textAlign: 'center',
                  textVerticalAlign: 'middle',
                  font: `bold ${rectSize * 0.07}px sans-serif`,  // Tamanho do título
                  fill: this.titleColor  // Cor do título
                },                
              },
              {
                type: 'text',
                style: {
                  text: this.value.toString(),
                  x: xPos + rectSize / 2,
                  y: yPos + rectSize / 1.6, // Posição vertical do valor
                  textAlign: 'center',
                  textVerticalAlign: 'middle',
                  font: `bold ${rectSize * 0.3}px sans-serif`,  // Valor grande
                  fill: this.valueColor  // Cor do valor
                },
              },
              {
                type: 'line',  // Linha divisória
                shape: {
                  x1: xPos + padding,
                  y1: yPos + rectSize * 0.35,
                  x2: xPos + rectSize - padding,
                  y2: yPos + rectSize * 0.35
                },
                style: {
                  stroke: this.dividerColor,  // Cor da linha
                  lineWidth: 1
                }
              }
            ]
          };
        },
        data: [
          { value: [this.value] }
        ],
      }]
    };
  }
}
