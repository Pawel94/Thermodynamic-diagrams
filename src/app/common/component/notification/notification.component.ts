import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {tap} from "rxjs";
import {ErrorHandlerService} from "../../services/error-handler-notification/error-handler.service";
import {SuccessHandlerService} from "../../services/success-handler-notification/success-handler.service";
import {InfoHandlerService} from "../../services/info-handler-notification/info-handler.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0.5, transform: 'translateX(500px)'}),
        animate('800ms', style({opacity: 1, transform: 'translateX(110)'})),
      ]),
      transition(':leave', [
        animate('800ms', style({opacity: 0, transform: 'translateX(100px)'})),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  successMessage$ = this.successNotificationService.successMessageSubject$.pipe(
    tap(() => {
      setTimeout(() => {
        this.successNotificationService.clearSuccessMessage();
      }, 7000);
    })
  );
  errorMessage$ = this.errorNotificationService.errorMessageSubject$.pipe(
    tap(() => {
      setTimeout(() => {
        this.errorNotificationService.clearErrorMessage();
      }, 7000);
    })
  );

  infoMessage$ = this.infoNotificationService.infoMessageSubject$.pipe(
    tap(() => {
      setTimeout(() => {
        this.infoNotificationService.clearInfoMessage();
      }, 7000);
    })
  );

  constructor(private errorNotificationService: ErrorHandlerService,
              private successNotificationService: SuccessHandlerService,
              private infoNotificationService: InfoHandlerService) {
  }

  ngOnInit(): void {
  }

}
