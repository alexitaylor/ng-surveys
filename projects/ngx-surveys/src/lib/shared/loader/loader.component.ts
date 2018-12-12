import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngxs-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isInherit = false;

  constructor() { }

  ngOnInit() {
  }

}
