import { Component, OnInit } from '@angular/core';
import {IQuestionItem} from '../../../builder/question-builder/question-item.component';
import {QuestionBuilderService} from '../../../builder/question-builder/question-builder.service';

@Component({
  selector: 'sb-question-builder-container',
  templateUrl: './question-builder-container.component.html',
  styleUrls: ['./question-builder-container.component.scss']
})
export class QuestionBuilderContainerComponent implements OnInit {
  question: IQuestionItem;
  questionType: string;

  constructor(private questionBuilder$: QuestionBuilderService) { }

  ngOnInit() {
  }

  onQuestionTypeSelect(questionType: string) {
    if (questionType === 'shortText') {
      this.question = this.questionBuilder$.getShortText();
    } else if (questionType === 'longText') {
      this.question = this.questionBuilder$.getLongText();
    } else if (questionType === 'radio') {
      this.question = this.questionBuilder$.getRadio();
    } else if (questionType === 'checkboxes') {
      this.question = this.questionBuilder$.getCheckbox();
    } else if (questionType === 'select') {
      this.question = this.questionBuilder$.getSelect();
    } else if (questionType === 'date') {
      this.question = this.questionBuilder$.getDate();
    } else if (questionType === 'range') {
      this.question = this.questionBuilder$.getRange();
    }
  }

}
