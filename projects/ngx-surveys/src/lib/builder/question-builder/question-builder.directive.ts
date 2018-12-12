import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[sbQuestionBuilder]'
})
export class QuestionBuilderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
