import {Component, OnInit} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  standalone: true,
  imports: [NgbModule]
})
export class InfoModalComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal() {

  }
}
