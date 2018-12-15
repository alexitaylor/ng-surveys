import { Component, OnInit, Input } from '@angular/core';
import {IElements, NgxSurveyState} from '../../../models';
import {Store} from '@ngrx/store';
import {UpdateParagraphHTMLAction} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngxs-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() element: IElements;

  constructor(
    private store: Store<NgxSurveyState>,
  ) { }

  ngOnInit() {
  }

  handleEditorEvent(html: string) {
    this.store.dispatch(new UpdateParagraphHTMLAction({ pageId: this.element.pageId, elementId: this.element.id, html }));
  }

}
