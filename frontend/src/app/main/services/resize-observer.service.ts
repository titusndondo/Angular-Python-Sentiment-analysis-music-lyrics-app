import { ElementRef, Injectable } from "@angular/core";
import { ResizeObserver } from "resize-observer";
import { ResizeObserverEntry } from "resize-observer/lib/ResizeObserverEntry";
import { Subject } from "rxjs";

export interface Dimensions {
  width: number,
  height: number
};

@Injectable({providedIn: 'root'})
export class ResizeObserverService {

  resizeSubject = new Subject();

  constructor() { };

  observeElement(element: ElementRef) {
    const resizeObserver = new ResizeObserver(entries => {

        let dimensions: Dimensions;
        entries.forEach((entry: ResizeObserverEntry) => {
          
          const height = entry.contentRect.height;
          const width = entry.contentRect.width;
          dimensions = { height: height, width: width };

          this.resizeSubject.next(dimensions);

        });
      });

    resizeObserver.observe(element.nativeElement);

  };

};