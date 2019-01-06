import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngs-paragraph-summary-viewer',
  templateUrl: './survey-paragraph-viewer.component.html',
  styleUrls: ['./survey-paragraph-viewer.component.scss']
})
export class SurveyParagraphViewerComponent implements OnInit {
  @Input() html: string;

  constructor() { }

  ngOnInit() {
  }

}
