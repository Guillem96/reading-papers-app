import { Injectable } from '@angular/core';
import { Project, Tag } from './models/project';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  public getProjects(): Map<string, Project> {
    const projectsJSON = window.localStorage.getItem('projects');
    const res = new Map<string, Project>();
    
    if (isNullOrUndefined(projectsJSON) || projectsJSON.trim() === '')
      return res;
    
    const parsedPairs = new Map<string, any>(JSON.parse(projectsJSON));
    
    for (const [key, value] of parsedPairs) {
      res.set(key, new Project(value));
    }

    return res;
  }
  
  public saveProject(project: Project) {
    const projects = this.getProjects();
    projects.set(project.projectId, project);
    this.save(projects);
  }

  private save(projects: Map<string, Project>): void {
    const projectsJSON = JSON.stringify([...projects.entries()]);
    window.localStorage.setItem('projects', projectsJSON);
  }

  public export(): void {
    const projectsJSON = JSON.stringify([...this.getProjects().entries()]);
    var element = document.createElement('a');
    element.setAttribute(
      'href', "data:text/json;charset=UTF-8," + encodeURIComponent(projectsJSON));
    element.setAttribute('download', "exported-projects.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  public import(projects: Project[]): void {
    
  }
  
  public getProjectData(projectId: string): Project {
    const projects = this.getProjects();
    return projects.get(projectId);
  }

  public getAllTags(): Tag[] {
    const flatMap = (f, xs) => xs.reduce((acc,x) => acc.concat(f(x)), []);

    const projects = this.getProjects().values();
    return [... new Set(flatMap(p => p.tags, projects))] as Tag[];
  }

  public createProject(project: Project) {
    const projects = this.getProjects();
    const names = [...projects.values()].map(p => p.name);
    if (names.includes(project.name)) {
      alert("Project " + project.name + " already exists");
      return;
    }
    this.saveProject(project);
  }

  public deleteProject(projectId: string): void {
    const projects = this.getProjects();
    projects.delete(projectId);
    this.save(projects);
  }
}
