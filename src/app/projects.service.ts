import { Injectable } from '@angular/core';
import { Project, ProjectInfo } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  public getProjects(): Project[] {
    return [
      new Project({
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
      })
    ];
    const projectsJSON = window.localStorage.getItem('projects');
    return JSON.parse(projectsJSON);
  }
  
  public saveProject(project: ProjectInfo) {
    window.localStorage.setItem(project.projectId, 
      JSON.stringify(project))
  }

  public getProjectData(projectId: string): ProjectInfo {
    const projectJSON = window.localStorage.getItem(projectId);
    return new ProjectInfo(JSON.parse(projectJSON));
  }
}
