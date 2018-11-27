import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-builder-viewer',
  templateUrl: './builder-viewer.component.html',
  styleUrls: ['./builder-viewer.component.scss']
})
export class BuilderViewerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    console.log('builder-viewer init');
  }

}
