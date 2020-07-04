import { Injectable } from '@angular/core';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  public getProjects(): Project[] {
    return [
      {
        name: "Action Recognition Deep Learning",
        tags: [
          {
            name: "Deep Learning",
            color: "#ff0000"
          }, 
          { 
            name: "AI",
            color: "#00ff00"
          }
        ]
      }
    ];
    const projectsJSON = window.localStorage.getItem('projects');
    return JSON.parse(projectsJSON);
  }
  
  public saveProject(project: any) {
    const projectId = project.name.toLowerCase().replace(/ /g, "-");
    window.localStorage.setItem(projectId, JSON.stringify(project))
  }

  public getProjectData(projectId: string): any {
    const projectJSON = window.localStorage.getItem(projectId);
    return JSON.parse(projectJSON);
  }
}
