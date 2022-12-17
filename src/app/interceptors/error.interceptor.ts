import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from "../common/services/error-handler-notification/error-handler.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationError: ErrorHandlerService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.notificationError.setErrorMessage("Cannot get data",errorResponse)
        if (errorResponse.error instanceof ErrorEvent) {
          return throwError(() => errorResponse.error);
        }
        return throwError(() => errorResponse);
      })
    );
  }
}
