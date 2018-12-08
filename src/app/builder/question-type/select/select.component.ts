import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() data: any;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.optionAnswersSub = this.store.pipe(select(fromRoot.getOptionAnswers, { elementId: this.data.element.id })).subscribe(res => {
      this.optionAnswers = res;
    });
  }

  ngOnDestroy() {
    this.optionAnswersSub.unsubscribe();
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
