import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { takeWhile } from 'rxjs/operators';
import { SketchpadService } from './sketchpad.service'

@Component({
  selector: 'app-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: [ './sketchpad.component.scss' ]
})
export class SketchpadComponent implements OnInit  {

  constructor(private elementRef: ElementRef, private _sketchpadService: SketchpadService) { }
  @ViewChild('sketchpad') sketchpadRef: ElementRef;
  ngOnInit(){

      const sketchPad: HTMLElement = this.sketchpadRef.nativeElement;
      this._sketchpadService.handleEvents(sketchPad);
      this._sketchpadService.drawEllipse();
//     console.log('test');
//   Observable.fromEvent(this.canvasRef.nativeElement, 'mousemove')
//   .subscribe(e => {
//   console.log(e.pageX, e.pageY);
// })

}
  }
