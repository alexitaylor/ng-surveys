import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'ngs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() editorData: string;
  @Output() editorDataEvent = new EventEmitter<string>();

  public Editor = ClassicEditor;

  surveyDataSubject = new Subject<any>();

  constructor() {}

  ngOnInit() {
    this.surveyDataSubject.pipe(
      map((res: string) => res),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(editorData => {
      this.editorDataEvent.emit(editorData);
    });
  }

  onEditorChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.surveyDataSubject.next(data);
  }
}
