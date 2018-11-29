import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {IQuestionItem} from './question-item.component';
import {QuestionBuilderDirective} from './question-builder.directive';
import {IQuestionBuilder} from './question-builder.model';
import {BehaviorSubject} from 'rxjs';
import {QuestionBuilderService} from './question-builder.service';

@Component({
  selector: 'sb-question-builder-component',
  template: `
    <div *ngIf="hasQuestion">
      <ng-template sbQuestionBuilder></ng-template>
    </div>
  `,
  styles: []
})
export class QuestionBuilderComponent implements OnInit {
  hasQuestion = false;
  question: IQuestionItem;

  private _questionType = new BehaviorSubject<string>(null);

  @Input()
  set questionType(value) {
    this._questionType.next(value);
  }

  get questionType() {
    return this._questionType.getValue();
  }

  @ViewChild(QuestionBuilderDirective) questionBuilderHost: QuestionBuilderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private questionBuilder$: QuestionBuilderService) { }

  ngOnInit() {
    this._questionType.subscribe(payload => {
      if (!!payload) {
        this.hasQuestion = true;
        setTimeout(() => {
          this.question = this.getQuestionType(payload);
          this.loadComponent();
        }, 300);
      } else {
        this.hasQuestion = false;
      }
    });
  }

  loadComponent() {
    const questionItem = this.question;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      questionItem.component
    );

    const viewContainerRef = this.questionBuilderHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    if (!!questionItem.data) {
      (<IQuestionBuilder>componentRef.instance).data = questionItem.data;
    }
  }

  private getQuestionType(type: string): IQuestionItem {
    if (type === 'shortText') {
      return this.questionBuilder$.getShortText();
    } else if (type === 'longText') {
      return this.questionBuilder$.getLongText();
    } else if (type === 'radio') {
      return this.questionBuilder$.getRadio();
    } else if (type === 'checkboxes') {
      return this.questionBuilder$.getCheckbox();
    } else if (type === 'select') {
      return this.questionBuilder$.getSelect();
    } else if (type === 'date') {
      return this.questionBuilder$.getDate();
    } else if (type === 'range') {
      return this.questionBuilder$.getRange();
    }
  }

}
