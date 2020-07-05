import { Component, OnInit } from '@angular/core';
import { Tag, Project } from './../../models/project';
import { ProjectsService } from './../../projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  public name: string;
  public tags: Tag[];
  public newTagName: string;
  public allTags: Tag[] = [];
  public addedTags: Tag[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.allTags = this.projectService.getAllTags();
  }

  public clickOnTag(i: number) {
    if (this.addedTags.includes(this.allTags[i])) {
      return;
    }
    this.addedTags.push(this.allTags[i]);
  }

  public removeTag(i: number) {
    this.addedTags.splice(i, 1);
  }

  public addTag(event) {
    if (this.newTagName.length > 0) {
      
      const addedNames = this.addedTags.map(t => t.name);
      if (addedNames.includes(this.newTagName)) {
        this.newTagName = '';
        return;
      }

      this.addedTags.push({
        name: this.newTagName,
        color: "#" + Math.floor(Math.random()*16777215).toString(16)
      })
      this.newTagName = '';
    }
  }

  public createProject() {
    // TODO alerts
    if (this.name.length < 3) {
      alert("Name must have at least 3 characters");
      return;
    }

    const project = new Project({name: this.name, tags: this.addedTags});
    this.projectService.createProject(project);
    this.router.navigate(['/']);
  }
}
