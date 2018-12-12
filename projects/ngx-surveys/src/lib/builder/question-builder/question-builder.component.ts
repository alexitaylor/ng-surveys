import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {IQuestionItem} from './question-item.component';
import {QuestionBuilderDirective} from './question-builder.directive';
import {IQuestionBuilder} from './question-builder.model';
import {BehaviorSubject} from 'rxjs';
import {QuestionBuilderService} from './question-builder.service';
import {IElements} from '../../models/elements.model';

@Component({
  selector: 'ngxs-question-builder-component',
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

  @Input() element: IElements;
  @Input() surveyId: string;
  @Input() isView: boolean;

  // initialize a private variable _questions as a BehaviorSubject
  private _questionType = new BehaviorSubject<string>(null);

  // change questions to use getter and setter
  @Input()
  set questionType(value) {
    // set the latest value for _questions BehaviorSubject
    this._questionType.next(value);
  }

  get questionType() {
    // get the latest value from _questions BehaviorSubject
    return this._questionType.getValue();
  }

  @ViewChild(QuestionBuilderDirective) questionBuilderHost: QuestionBuilderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private questionBuilder$: QuestionBuilderService) { }

  ngOnInit() {
    this._questionType.subscribe((payload: string) => {
      if (!!payload) {
        this.hasQuestion = true;
        setTimeout(() => {
          this.question = this.questionBuilder$.getElementTypeComponent(payload, this.element, this.surveyId, this.isView);
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

}
