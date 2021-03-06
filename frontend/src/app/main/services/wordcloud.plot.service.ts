import { Injectable } from '@angular/core';
import { scaleLog } from 'd3';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';

@Injectable({ providedIn: 'root' })
export class WordcloudPlotService {
  constructor() {}

  plotWordCloud(data: any, dimensions: any) {
    if (!dimensions?.width) return;

    const continentColor = scaleOrdinal([
      '#00A489',
      '#00727F',
      '#F9F871',
      '#82D37C',
    ]);

    const chartSvg = select('.wordcloud-chart')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const xScale: any = scaleLinear()
      .domain([1, 100])
      .range([0, dimensions.width]);
    const xAxis: any = axisBottom(xScale);
    chartSvg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yScale = scaleLinear().domain([0, 100]).range([dimensions.height, 0]);
    const yAxis: any = axisLeft(yScale);
    chartSvg.select('.y-axis').call(yAxis);

    // console.log(data);

    select('.word-circles').remove();

    const circleGroups = chartSvg
      .append('g')
      .attr('class', 'word-circles')
      .selectAll('.circle-group')
      .data(data)
      .join('g')
      .attr('class', 'circle-group');

    // const circles = circleGroups
    //   .append('circle')
    //   .attr('class', 'word-circle')
    //   .attr('cx', (d: any) => xScale(d.x))
    //   .attr('cy', (d: any) => yScale(d.y))
    //   .attr('r', (d: any) => d.freq * 2)
    //   .attr('fill', (d: any) => continentColor(d.sentiment));

    circleGroups
      .append('text')
      .attr('dx', (d: any) => xScale(d.x))
      .attr('dy', (d: any) => yScale(d.y))
      .text((d: any) => d.word)
      .attr('text-anchor', 'middle')
      .attr('fill', (d: any) => continentColor(d.sentiment)) //'#1b1e27'
      .style('font-weight', '100')
      .style('font-size', (d: any) => d.freq * 2);

    return data;
  }
}
