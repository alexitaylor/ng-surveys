import * as utils from '../store/utils';

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
    this.id = id ? id : utils.UUID();
    this.html = html ? html : '';
    this.elementId = elementId ? elementId : '';
  }
}
