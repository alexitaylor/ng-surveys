import { Component, OnInit } from '@angular/core';
import {
  IBuilderOptions,
  NgxSurveyState,
  BuilderOptionsModel,
  IElementAndOptionAnswers,
  deserializeUtils,
} from 'ngx-surveys';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-builder-viewer-container',
  templateUrl: './builder-viewer-container.component.html',
  styleUrls: ['./builder-viewer-container.component.scss']
})
export class BuilderViewerContainerComponent implements OnInit {
  options: IBuilderOptions;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.options = {
      importSurvey: {
        callback: this.importSurvey.bind(this),
      },
      surveyButtons: [{
        title: 'Save Survey to DB',
        icon: 'fas fa-save',
        text: 'Save',
        callback: this.saveSurvey,
      }],
      importElement: {
        callback: this.importElement.bind(this),
      },
      elementButtons: [{
        title: 'Save Element to DB',
        icon: 'fas fa-save',
        text: 'Save',
        callback: this.saveElement,
      }]
    };
  }

  importSurvey(): Observable<NgxSurveyState> {
    // Mocking get request
    return this.getSurvey();
  }

  importElement(): Observable<IElementAndOptionAnswers> {
    // Mocking get request
    return this.getElement();
  }

  getSurvey(): Observable<NgxSurveyState> {
    return this.http.get('assets/survey-data.json').pipe(map((res: NgxSurveyState) => {
      return {
        survey: res.survey,
        pages: deserializeUtils.deserializePages(res.pages),
        elements: deserializeUtils.deserializeElements(res.elements),
        optionAnswers: deserializeUtils.deserializeOptionAnswersMaps(res.optionAnswers),
        builderOptions: new BuilderOptionsModel(),
      };
    }));
  }

  getElement(): Observable<IElementAndOptionAnswers> {
    return this.http.get('assets/element-data.json').pipe(map((res: IElementAndOptionAnswers) => {
      return {
        element: res.element,
        optionAnswers: deserializeUtils.deserializeOptionAnswersMap(res.optionAnswers),
      };
    }));
  }

  saveSurvey(ngxSurveyState: NgxSurveyState): void {
    // Add post request to save survey data to the DB
    console.log('ngxSurveyState: ', ngxSurveyState);
  }

  saveElement(element: IElementAndOptionAnswers): void {
    // Add post request to save survey data to the DB
    console.log('element: ', element);
  }

}
