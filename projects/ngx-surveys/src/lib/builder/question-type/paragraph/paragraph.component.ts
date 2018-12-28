import { Component, OnInit, Input } from '@angular/core';
import {IElements} from '../../../models';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';
import {ElementsReducer} from '../../../store/elements/elements.reducer';

@Component({
  selector: 'ngxs-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() element: IElements;

  constructor(
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
  }

  handleEditorEvent(html: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.PARAGRAPH_UPDATE_HTML_ACTION,
      payload: { pageId: this.element.pageId, elementId: this.element.id, html }
    });
  }

}
