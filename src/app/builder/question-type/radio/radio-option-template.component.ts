import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'sb-radio-option-template',
  templateUrl: './radio-option-template.component.html',
  styleUrls: ['./radio-option-template.component.scss']
})
export class RadioOptionTemplateComponent implements OnInit {
  @Input() position: number;
  @Input() isPageNavChecked: boolean;

  @Input() value: string;
  @Output() valueEvent = new EventEmitter<string>();

  @Input() pages: string[] = [];
  pageNavNext: string;
  @Output() pageNavNextEvent = new EventEmitter<string>();

  isOptionActive = false;

  constructor() { }

  ngOnInit() {
  }

  onFocus(e) {
    if (e.returnValue) {
      this.isOptionActive = e.returnValue;
      // TODO add another option
    }
  }

  handleCheckBoxChange(value) {
    this.valueEvent.emit(value);
  }

  handlePageNavNext(value) {
    this.pageNavNextEvent.emit(value);
  }

}
