import { Section } from './section';

export interface Tag {
  name: string;
  color: string;
}


export class Project {
  name: string;
  tags: Tag[];
  sections: Section[];

  constructor(obj ? : any) {
    this.name = obj && obj.name || '';
    this.tags = obj && obj.tags || [];
    this.sections = obj && obj.sections || [];
  }

  public get projectId(): string {
    return this.name?.toLowerCase().replace(/ /g, '-');
  }

  public clone(): Project {
    var cloneObj = new Project();
    cloneObj.name = this.name;
    cloneObj.tags = this.tags.slice();
    cloneObj.sections = this.sections.slice();
    return cloneObj;
  }
}