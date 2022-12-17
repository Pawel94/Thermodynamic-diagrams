import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export interface errorBody {
  error?: string,
  message?: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() {
  }

  private errorMessageSubject = new Subject<string>();
  errorMessageSubject$ = this.errorMessageSubject.asObservable();
  messageErrorForm = '[Error occured]: ';
  messageDetails = '[Details]: ';

  setErrorMessage(message?: string, errorBody?: errorBody) {
    if (message !== '') {
      message = this.messageErrorForm + message + this.messageDetails +
        errorBody?.error
    }
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage() {
    this.setErrorMessage('');
  }
}
