import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {
  model = {
    surveyTemplate: {
      name: 'name',
      description: 'description'
    },
    questions: [
      {
        id: 1,
        name: 'name',
        formType: 'formType'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }
}
