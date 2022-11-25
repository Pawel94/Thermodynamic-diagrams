import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-container',
  templateUrl: './manager-container.component.html',
  styleUrls: ['./manager-container.component.scss']
})
export class ManagerContainerComponent implements OnInit {
  active: any;

  constructor() { }

  ngOnInit(): void {
  }

}
