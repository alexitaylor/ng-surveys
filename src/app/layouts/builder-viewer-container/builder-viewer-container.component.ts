import { Component, OnInit } from '@angular/core';
import {IBuilderViewerOptions, NgxSurveyState, deserializePages, deserializeElements, deserializeOptionAnswers} from 'ngx-surveys';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-builder-viewer-container',
  templateUrl: './builder-viewer-container.component.html',
  styleUrls: ['./builder-viewer-container.component.scss']
})
export class BuilderViewerContainerComponent implements OnInit {
  options: IBuilderViewerOptions;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.options = {
      importSurvey: {
        callback: this.importSurvey.bind(this),
      },
      buttons: [{
        title: 'Save Survey to DB',
        icon: 'fas fa-save',
        text: 'Save',
        callback: this.saveSurvey,
      }]
    };
  }

  importSurvey(): Observable<NgxSurveyState> {
    return this.getSurvey();
  }

  getSurvey(): Observable<NgxSurveyState> {
    return this.http.get('assets/survey-data.json').pipe(map((res: NgxSurveyState) => {
      return {
        survey: res.survey,
        pages: deserializePages(res.pages),
        elements: deserializeElements(res.elements),
        optionAnswers: deserializeOptionAnswers(res.optionAnswers),
      };
    }));
  }

  saveSurvey(ngxSurveyState: NgxSurveyState): void {
    // Add post request to save survey data to the DB
    console.log('ngxSurveyState: ', ngxSurveyState);
  }

}
