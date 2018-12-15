import { Component, OnInit, Input } from '@angular/core';
import {INgxSurvey} from '../../../models';

@Component({
  selector: 'ngxs-survey-summary-viewer',
  templateUrl: './survey-summary-viewer.component.html',
  styleUrls: ['./survey-summary-viewer.component.scss']
})
export class SurveySummaryViewerComponent implements OnInit {
  @Input() survey: INgxSurvey;

  constructor() { }

  ngOnInit() {
  }

}
