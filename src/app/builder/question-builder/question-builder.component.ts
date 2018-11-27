import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {IQuestionItem} from './question-item.component';
import {QuestionBuilderDirective} from './question-builder.directive';
import {IQuestionBuilder} from './question-builder.model';
import {BehaviorSubject} from 'rxjs';

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
  private _question = new BehaviorSubject<IQuestionItem>(null);

  @Input()
  set question(value) {
    this._question.next(value);
  }

  get question() {
    return this._question.getValue();
  }

  @ViewChild(QuestionBuilderDirective) questionBuilderHost: QuestionBuilderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this._question.subscribe(payload => {
      if (!!payload) {
        this.hasQuestion = true;
        setTimeout(() => {
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
