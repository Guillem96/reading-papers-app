import { Component } from '@angular/core';
import { ProjectsService } from './projects.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reading-papers-app';
  
  constructor(public projectService: ProjectsService) {}

  public handleFiles(files: FileList) {
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-success mr-4',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "If an existing project has the same name, it will be overridden",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, import projects!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        if (files.length === 0) {
          return;
        }

        this.projectService.import(files.item(0));
      }
    });

  }
}
