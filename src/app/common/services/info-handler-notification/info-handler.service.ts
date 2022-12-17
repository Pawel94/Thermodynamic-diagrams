import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {

  constructor() { }
  private infoMessageSubject = new Subject<string>();
  infoMessageSubject$ = this.infoMessageSubject.asObservable();
  messageErrorForm = '[Info]: ';


  setInfoMessage(message?: string,) {
    if (message !== '') {
      message = this.messageErrorForm + message
    }
    this.infoMessageSubject.next(message);
  }

  clearInfoMessage() {
    this.setInfoMessage('');
  }
}
