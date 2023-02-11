import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../common/services/load-service/load-service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public readonly loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
