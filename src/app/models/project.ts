import { Section } from './section';

export class Project {
    name: string;
    tags: any[];

    constructor(obj?: any) {    
        this.name = obj && obj.name || '';
        this.tags = obj && obj.tags || [];
    }
    
    public get projectId(): string {
        return this.name?.toLowerCase().replace(/ /g, '-');
    }
}


export class ProjectInfo {
    name: string;
    sections: Section[];
    
    constructor(obj?: any) {    
        this.name = obj && obj.name || '';
        this.sections = obj && obj.sections || [];
    }

    public get projectId(): string {
        return this.name?.toLowerCase().replace(/ /g, '-');
    }
    
    public clone(): ProjectInfo {
        var cloneObj = new ProjectInfo();
        cloneObj.name = this.name;
        cloneObj.sections = this.sections.slice();
        return cloneObj;

    }
}