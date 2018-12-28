import {UUID} from 'angular2-uuid';

export interface IParagraph {
  id?: string;
  html?: string;
  elementId?: string;
}

export class Paragraph implements IParagraph {
  constructor(
    public  id?: string,
    public html?: string,
    public elementId?: string,
  ) {
    this.id = id ? id : UUID.UUID();
    this.html = html ? html : '';
    this.elementId = elementId ? elementId : '';
  }
}
