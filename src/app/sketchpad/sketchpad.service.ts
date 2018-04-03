import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/repeat';
declare const SVG:any;

@Injectable()
export class SketchpadService {
  private mouseOnMove: Observable<any>;
  private mouseOnclick: Observable<any>;
  private orgin: any;

  public registerSketchpad(sketchPad: HTMLElement) {

  }
  public handleEvents(sketchPad: HTMLElement) {
    // this.mouseOnMove =
    Observable.fromEvent(sketchPad, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(sketchPad, 'mousemove')
          .takeUntil(Observable.fromEvent(sketchPad, 'mouseup'))
          .takeUntil(Observable.fromEvent(sketchPad, 'mouseleave'))
          .distinctUntilChanged()
      }).subscribe((e: MouseEvent) => {
        let a = this.orgin.x - e.pageX;
        let b = this.orgin.y - e.pageY;
        console.log(Math.sqrt(a*a + b* b));
      });

    // this.mouseOnclick =
    Observable.fromEvent(sketchPad, 'mousedown').subscribe((e: MouseEvent) => {
      this.orgin = {
        x: e.pageX,
        y: e.pageY
      }
      console.log('first', this.orgin);
    });

    Observable.fromEvent(sketchPad, 'mouseup').subscribe((e) => {
      console.log('last',e);
    });
  }

  public drawEllipse() {
    let draw = SVG('sketchpad').size(300, 300)
    let rect = draw.rect(100, 100).attr({ fill: '#f06' })
  }


}
