import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './../../projects.service';
import { Project } from './../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    console.log(this.projectService.getProjects())
    this.projects = [...this.projectService.getProjects().values()];
    console.log(this.projects);
  }

}
