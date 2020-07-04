import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() public project: Project;

  constructor() { }

  ngOnInit(): void {
  }

  get projectId() {
    return this.project?.name.toLowerCase().replace(/ /g, '-');
  }
}
