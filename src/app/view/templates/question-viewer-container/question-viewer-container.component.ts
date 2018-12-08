import {Component, Input, OnInit} from '@angular/core';
import {IElements} from '../../../models/elements.model';

@Component({
  selector: 'sb-question-viewer-container',
  templateUrl: './question-viewer-container.component.html',
  styleUrls: ['./question-viewer-container.component.scss']
})
export class QuestionViewerContainerComponent implements OnInit {
  @Input() element: IElements;

  constructor() { }

  ngOnInit() {
  }

}
