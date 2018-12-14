import {Component, OnInit} from '@angular/core';
import {NgxSurveysService, NgxSurveyState, INgxSurvey, IPageMap, IElementsMaps, IOptionAnswersMaps} from 'ngx-surveys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-surveys-app';
  ngxSurveyState: NgxSurveyState;
  survey: INgxSurvey;
  pages: IPageMap;
  elements: IElementsMaps;
  optionAnswers: IOptionAnswersMaps;

  constructor(
    private ngxSurveys$: NgxSurveysService,
  ) {}

  ngOnInit() {
    this.ngxSurveys$.getNgxSurveyState().subscribe(res => {
      console.log('ngxSurveyStateRes: ', res);
      this.ngxSurveyState = res;
    });

    this.ngxSurveys$.getSurveyChanges().subscribe(resSurvey => {
      console.log('resSurvey: ', resSurvey);
      this.survey = resSurvey;
    });

    this.ngxSurveys$.getPagesChanges().subscribe(pagesRes => {
      console.log('pagesRes: ', pagesRes);
      this.pages = pagesRes;
    });

    this.ngxSurveys$.getElementsChanges().subscribe(elementsRes => {
      console.log('elementsRes: ', elementsRes);
      this.elements = elementsRes;
    });

    this.ngxSurveys$.getOptionAnswersChanges().subscribe(optionAnswersRes => {
      console.log('optionAnswersRes: ', optionAnswersRes);
      this.optionAnswers = optionAnswersRes;
    });
  }
}
