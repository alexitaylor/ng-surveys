import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {AppState} from '../../../store/app.state';
import {FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {
  @Input() data: any;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSub: Subscription;

  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.optionAnswersSub = this.store.pipe(select(fromRoot.getOptionAnswers, { elementId: this.data.element.id })).subscribe(res => {
      this.optionAnswers = res;
    });

    const controls = Array.from(this.optionAnswers).map(c => new FormControl(false));
    controls[0].setValue(true);

    this.form = this.formBuilder.group({
      optionAnswers: new FormArray(controls, this.minSelectedCheckboxes(1))
    });
  }
  ngOnDestroy() {
    this.optionAnswersSub.unsubscribe();
  }

  private minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  // TODO use to update state
  // submit() {
  //   const selectedOrderIds = this.form.value.orders
  //     .map((v, i) => v ? this.orders[i].id : null)
  //     .filter(v => v !== null);
  //
  //   console.log(selectedOrderIds);
  // }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
