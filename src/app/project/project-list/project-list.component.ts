import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './../../projects.service';
import { Project } from './../../models/project';
import Swal from 'sweetalert2'

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

  public deleteProject(idx: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-success mr-4',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const project = this.projects[idx];
        this.projectService.deleteProject(project.projectId);
        this.projects.splice(idx, 1);
      }
    });
  }
}
