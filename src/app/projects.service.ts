import { Injectable } from '@angular/core';
import { Project, ProjectInfo, Tag } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  public getProjects(): Project[] {
    const projectsJSON = window.localStorage.getItem('projects');
    return (JSON.parse(projectsJSON) || []).map(o => new Project(o));
  }
  
  public saveProject(project: ProjectInfo) {
    window.localStorage.setItem(project.projectId, 
      JSON.stringify(project))
  }

  public getProjectData(projectId: string): ProjectInfo {
    const projectJSON = window.localStorage.getItem(projectId);
    return new ProjectInfo(JSON.parse(projectJSON));
  }

  public getAllTags(): Tag[] {
    const flatMap = (f, xs) => xs.reduce((acc,x) => acc.concat(f(x)), []);

    const projects = this.getProjects();
    return [... new Set(flatMap(p => p.tags, projects))] as Tag[];
  }

  public createProject(project: Project) {
    const projects = this.getProjects();
    const names = projects.map(p => p.name);
    if (names.includes(project.name)) {
      alert("Project " + project.name + " already exists");
      return;
    }
    const projectInfo = new ProjectInfo({name: project.name, sections: []});
    projects.push(project);
    
    this.saveProject(projectInfo);
    window.localStorage.setItem('projects', JSON.stringify(projects));
  }
}
