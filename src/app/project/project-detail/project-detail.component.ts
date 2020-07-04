import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/projects.service';
import { ProjectInfo } from 'src/app/models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public project: ProjectInfo = null;
  private sub: any;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.project = this.projectService.getProjectData(params['project-id']);
      });
  }

  public getIndex(index) {
    return index;
  }
  public deletePaper(paperPos:number, sectionPos: number) {  
    this.project.sections[sectionPos].papers.splice(paperPos, 1);
    if (this.project.sections[sectionPos].papers.length === 0) {
      this.project.sections.splice(sectionPos, 1);
    }
    this.project = this.project.clone();
    this.projectService.saveProject(this.project);
  }

  public trimName(name: string): string {
    if (name.length > 50) {
      return name.substring(0, 50) + ' ...';
    }
    return name;
  }

  public updateCheckboxes(event, paperPos: number, sectionPos: number) { 
    const target = event.target;
    const id = target.attributes.id.nodeValue;
    const slicedId = id.split('-');
    const order = parseInt(slicedId[slicedId.length - 2]);

    if (target.checked) {
      for (let i = 0; i <= order; i++) {
        this.project.sections[sectionPos].papers[paperPos].understanding[i] = target.checked;
      }
    } else {
      for (let i = order; i < 5; i++) {
        this.project.sections[sectionPos].papers[paperPos].understanding[i] = target.checked;
      }
    }
    this.project = this.project.clone();
    this.projectService.saveProject(this.project);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
