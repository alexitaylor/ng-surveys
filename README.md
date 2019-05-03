# ng-surveys

[Demo](https://ng-surveys.firebaseapp.com/)

# Table of Contents

- [Getting started](#gettingstarted)
- [NgBuilderViewerComponent](#ngbuilderviewercomponent)
- [NgModelViewerComponent](#ngmodelviewercomponent)
- [NgSurveyViewerComponent](#NgSurveyViewerComponent)
- [NgSurveysService](#NgSurveysService)
- [Development](#Development)
- [Contributing](#contributing)

<a name="gettingstarted"></a>
## [⬆️](#tableofcontents) Getting started

First install through npm:

```bash
npm install --save ng-surveys
```

Next install peer dependencies

```bash
  npm install --save @angular/cdk @ckeditor/ckeditor5-angular @ckeditor/ckeditor5-build-classic bootstrap ngx-bootstrap jquery @fortawesome/fontawesome-free 
```

Import the ***ng-survey module*** into your ***apps module***:

```typescript
import { NgModule } from '@angular/core';
import { NgSurveysModule } from 'ng-surveys';

@NgModule({
  imports: [
    ...
    NgSurveysModule
  ],
  ...
})
export class AppModule { }
```

Add Bootstrap and Font Awesome to your ***angular.json*** to the ***styles*** and ***scripts*** array under build target

```json
{  
   "build":{  
      "styles":[  
         "src/styles.css",
         "node_modules/bootstrap/dist/css/bootstrap.min.css",
         "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
      ],
      "scripts":[  
         "node_modules/jquery/dist/jquery.min.js",
         "node_modules/bootstrap/dist/js/bootstrap.min.js"
      ]
   }
}
```
<a name="ngbuilderviewercomponent"></a>
## [⬆️](#tableofcontents) NgBuilderViewerComponent

***What is it?*** - Where your users build a survey.

### Example

```html
  <ngs-builder-viewer
    [options]="options"
  ></ngs-builder-viewer>
```

#### Options

An object with 6 optional properties:
1. ***importSurvey***
    * Object with ***callback*** property to import a new survey.
    * Callback should return type of ***NgSurveyState*** or ***Observable<NgSurveyState>***.
2. ***surveyButtons***
    * Array of objects used to specify a custom survey buttons. 
    * Object has 4 properties: ***title***, ***icon***, ***text***, and ***callback***. 
    * Callback has one parameter of ***NgSurveyState*** type.  
3. ***importPage***
    * Object with ***callback*** property to import a new page.
    * Callback should return type of ***IPageAndElementAndOptionAnswers*** or ***Observable<IPageAndElementAndOptionAnswers>***.
4. ***pageButtons***
    * Array of objects used to specify a custom survey buttons. 
    * Object has 4 properties: ***title***, ***icon***, ***text***, and ***callback***. 
    * Callback has one parameter of ***IPageAndElementAndOptionAnswers*** type. 
5. ***importElement***
    * Object with ***callback*** property to import a new element.
    * Callback should return type of ***IElementAndOptionAnswers*** or ***Observable<IElementAndOptionAnswers>***.
6. ***elementButtons***
    * Array of objects used to specify a custom survey buttons. 
    * Object has 4 properties: ***title***, ***icon***, ***text***, and ***callback***. 
    * Callback has one parameter of ***IElementAndOptionAnswers*** type.
    
### Options Example 

```typescript
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

  importSurvey(): Observable<NgSurveyState> {
    // Mocking get request
    return this.getSurvey();
  }

  importElement(): Observable<IElementAndOptionAnswers> {
    // Mocking get request
    return this.getElement();
  }

  getSurvey(): Observable<NgSurveyState> {
    return this.http.get('assets/survey-data.json').pipe(map((res: NgSurveyState) => {
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

  saveSurvey(ngSurveyState: NgSurveyState): void {
    // Add post request to save survey data to the DB
    console.log('ngSurveyState: ', ngSurveyState);
  }

  saveElement(element: IElementAndOptionAnswers): void {
    // Add post request to save survey data to the DB
    console.log('element: ', element);
  }

}
``` 
<a name="ngmodelviewercomponent"></a>
## [⬆️](#tableofcontents) NgModelViewerComponent 

***What is it?*** - Where users can view the survey model.

### Example

```html
  <ngs-model-viewer></ngs-model-viewer>
```
<a name="NgSurveyViewerComponent"></a>
## [⬆️](#tableofcontents) NgSurveyViewerComponent  

***What is it?*** - Where users can interact with the built survey.

### Example

```html
  <ngs-survey-viewer></ngs-survey-viewer>
```
<a name="NgSurveysService"></a>
## [⬆️](#tableofcontents) NgSurveysService

***What is it?*** - A service that provides methods to retrieve the survey state. Methods listen to the latest state changes in the stream and returns changes that occur to a specific state.

#### getNgSurveyState()
* Listen to the latest state changes in the stream.
* ***@returns***: ***Observable\<NgSurveyState\>***

#### getSurveyChanges()
* Listen to the latest survey state changes in the stream.
* ***@returns***: ***Observable\<INgSurvey\>***

#### getPagesChanges()
* Listen to the latest pages state changes in the stream.
* ***@returns***: ***Observable\<IPageMap\>***

#### getElementsChanges()
* Listen to the latest element state changes in the stream.
* ***@returns***: ***Observable\<IElementsMaps\>***

#### getElementsByPageIdChanges()
* Listen to the latest element state changes of a page in the stream.
* ***@param***: pageId to retrieve elements of a specific page
* ***@returns***: ***Observable\<IElementsMap\>***

#### getOptionAnswersChanges()
* Listen to the latest option answers state changes in the stream.
* ***@returns***: ***Observable\<IOptionAnswersMaps\>***

#### getOptionAnswersByElementIdChanges()
* Listen to the latest option answers state changes of an element in the stream.
* ***@param***: elementId to retrieve option answers of a specific element
* ***@returns***: ***Observable\<IOptionAnswersMap\>***

#### NgSurveysService Example

```typescript
import {NgSurveysService, NgSurveyState, IPageMap} from 'ng-surveys';

...
export class AppComponent implements OnInit {
  ngSurveyState: NgSurveyState;
  pages: IPageMap;
    
  constructor(
    private ngSurveys$: NgSurveysService,
  ) {}
    
  ngOnInit() {
    this.ngSurveys$.getNgSurveyState().subscribe(res => {
      this.ngSurveyState = res;
    });
    
    this.ngSurveys$.getPagesChanges().subscribe(pagesRes => {
      this.pages = pagesRes;
    });
  }
}
```
<a name="Development"></a>
## [⬆️](#tableofcontents) Development

* Clone repo
* Install dependencies:

```bash
npm install
```

### Building the Library

* Before we can use ng-surveys library we need to build it:

```bash
ng build ng-surveys
```

* With Angular CLI v6.2 we can use the --watch flag so that every time a file changes Angular CLI performs a partial build that emits the amended files:

```bash
ng build ng-surveys --watch
```

* Run the application project (demo app to test our library):

```bash
ng serve
```

* Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

<a name="contributing"></a>
# [⬆️](#tableofcontents) Contributing

Anyone is welcome to [contribute](.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](.github/CONTRIBUTING.md):

- [Bug reports](.github/CONTRIBUTING.md#bugs)
- [Feature requests](.github/CONTRIBUTING.md#features)
- [Pull requests](.github/CONTRIBUTING.md#pull-requests)

