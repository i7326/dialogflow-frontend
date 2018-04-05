import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '@env/environment';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.socketUrl);

    let observable = new Observable(observer => {
        this.socket.on('response', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    let observer = {
        next: (data: Object) => {
            this.socket.emit('request', JSON.stringify(data));
        },
    };

    return Rx.Subject.create(observer, observable);
  }

}