import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export interface errorBody {
  error?: string,
  message?: string
  name?:string
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
  messageDetails = 'Details: ';

  setErrorMessage(message?: string, errorBody?: errorBody) {
    if (message !== '') {
      message = this.messageErrorForm + message + '\n'+ this.messageDetails +
        errorBody?.name +  '\n'+ errorBody?.message
    }
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage() {
    this.setErrorMessage('');
  }
}
