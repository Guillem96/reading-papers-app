import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from './../../../models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() public project: Project;
  @Output() public deleteClick = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
}
