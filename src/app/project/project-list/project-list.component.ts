import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

}
