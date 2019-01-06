import {Component, Input, OnInit} from '@angular/core';
import {IElements} from '../../../models/elements.model';

@Component({
  selector: 'ngs-question-viewer-container',
  templateUrl: './question-viewer-container.component.html',
  styleUrls: ['./question-viewer-container.component.scss']
})
export class QuestionViewerContainerComponent implements OnInit {
  @Input() element: IElements;
  @Input() surveyId: string;

  constructor() { }

  ngOnInit() {
  }

}
