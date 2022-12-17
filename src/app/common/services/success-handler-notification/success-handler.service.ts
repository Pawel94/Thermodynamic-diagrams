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
  messageSuccessForm = '[Successfull]: ';

  messageStation = '[Station]: ';
  messageDate = '[Date]: ';

  setSuccessMessage(message: string, body?: any) {
    if (message !== '') {
      message = this.messageSuccessForm + message + '\n' + this.messageStation + body.stationNummer +
        '\n' + this.messageDate + this.parseDate(body.date);
    }
    this.successMessageSubject.next(message);
  }

  clearSuccessMessage() {
    this.setSuccessMessage('');
  }

  private parseDate(date: any) {
    return `${date?.day}-${date?.month}-${date?.year}`

  }

}
