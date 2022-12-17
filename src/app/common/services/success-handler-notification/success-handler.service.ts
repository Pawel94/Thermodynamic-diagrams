import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlerService {
  constructor() {
  }

  private successMessageSubject = new Subject<string>();
  successMessageSubject$ = this.successMessageSubject.asObservable();
  messageSuccesForm = 'Successfull: ';

  setSuccessMessage(message: string, body?: any) {
    console.log(body);
    if (message !== '') {
      message = this.messageSuccesForm + message + body;
    }
    this.successMessageSubject.next(message);
  }

  clearSuccessMessage() {
    this.setSuccessMessage('');
  }

}
