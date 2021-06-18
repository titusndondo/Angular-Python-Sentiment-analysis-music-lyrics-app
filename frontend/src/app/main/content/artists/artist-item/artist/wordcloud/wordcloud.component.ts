import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClientService } from 'src/app/main/services/http-client.service';
import { ResizeObserverService } from 'src/app/main/services/resize-observer.service';
import { WordcloudPlotService } from 'src/app/main/services/wordcloud.plot.service';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css'],
})
export class WordcloudComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() wordCloudData: any;
  @ViewChild('wordcloud_wrapper') wordcloud_wrapper!: ElementRef;
  wordCounts: any = [];
  dimensions!: { width: number; height: number };

  constructor(
    private httpClient: HttpClientService,
    private wordCloudPlot: WordcloudPlotService,
    private resizeObserverService: ResizeObserverService
  ) {}

  ngOnInit(): void {
    // console.log(this.wordCloudData);
    const sentiments = ['sad', 'angry', 'happy', 'relaxed'];

    sentiments.forEach((sentiment: string) => {
      let counts: any = [];
      // let sentiment = 'angry';
      const giantStringOfWords: string = this.wordCloudData
        .filter((d: any) => d.sentiment === sentiment)
        .map((d: any) => d.lyrics)
        .join(' ');

      giantStringOfWords.split(' ').forEach((word: string) => {
        let doc = {};
        let found = counts.map((d: any) => d.word);
        doc = { sentiment: sentiment };
        if (!found.includes(word)) {
          doc = { ...doc, ...{ word: word, count: 1 } };
          counts.push(doc);
        }
        if (found.includes(word)) {
          counts.find((d: any) => {
            return d.word === word;
          }).count += 1;
        }
      });

      counts = counts
        .map((d: any) => {
          return { ...d, ...{ freq: (d.count / counts.length) * 100 } };
        })
        .sort((a: { freq: number }, b: { freq: number }) => b.freq - a.freq);
      // console.log(counts.slice(0, 100));
      this.wordCounts = [...this.wordCounts, ...counts.slice(0, 100)];
    });

    // console.log(this.wordCounts);
    // console.log('Initial render wordcloud');
    this.wordCloudPlot.plotWordCloud(this.wordCounts, {
      width: 100,
      height: 100,
    });
  }

  ngAfterViewInit() {
    this.resizeObserverService.observeElement(this.wordcloud_wrapper);
    this.resizeObserverService.resizeSubject.subscribe((dimensions: any) => {
      // console.log('Wordcloud Size changed');
      this.dimensions = dimensions;
      // console.log('Wordcloud', dimensions);
      // console.log(this.albumsLineChartData);
      this.wordCloudPlot.plotWordCloud(this.wordCounts, this.dimensions);
    });
  }

  ngOnDestroy() {
    this.resizeObserverService.resizeSubject.unsubscribe();
  }
}