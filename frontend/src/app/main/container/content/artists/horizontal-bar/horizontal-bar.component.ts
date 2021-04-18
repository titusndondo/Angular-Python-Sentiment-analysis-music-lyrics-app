import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResizeObserverService } from 'src/app/main/services/resize-observer.service';
import * as d3  from 'd3';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css']
})
export class HorizontalBarComponent implements OnInit, AfterViewInit {

  @Input() multi: any;
  @ViewChild('wrapper') wrapper!: ElementRef;
  view: [number, number] = [200, 30];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';

  colorScheme = {
    domain: ['#00A489', '#00727F', '#F9F871', '#82D37C']
  };

  constructor(
    private resizeObserverService: ResizeObserverService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.resizeObserverService.observeElement(this.wrapper);
    this.resizeObserverService.resizeSubject.subscribe(
      (dimensions: any) => {
        this.view = [dimensions.width, dimensions.height]
      }
    )

    const bars: d3.Selection<d3.BaseType, unknown, HTMLElement, any> = d3.selectAll('.bar');
  }

  onSelect(event: any) {
    console.log(event);
  }

}
