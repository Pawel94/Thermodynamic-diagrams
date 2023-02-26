import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-chart-option-form-group',
  templateUrl: './chart-option-form-group.component.html',
  styleUrls: ['./chart-option-form-group.component.scss']
})
export class ChartOptionFormGroupComponent implements OnInit {
  @Input() formGroupName!: string
  form!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }

}
