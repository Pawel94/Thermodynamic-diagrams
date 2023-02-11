import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {LoaderService} from "../common/services/load-service/load-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router,
              public readonly loaderService: LoaderService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({headers: request.headers.append('Content-Type', 'application/json')});
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.loaderService.isLoading.next(false)
        this.router.navigate(['/404']);
        return throwError(() => errorResponse);
      })
    );
  }
}
