import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from './../../../projects.service';
import { ProjectInfo } from 'src/app/models/project';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  public project: ProjectInfo = null;
  public projectId: ProjectInfo = null;

  public sections: string[] = [];
  private sub: any;
  public name: string;
  public link: string;
  public section: string;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.projectId = params['project-id'];
        this.project = this.projectService.getProjectData(params['project-id']);
        this.sections = this.project.sections.map(s => s.name);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public createResource() {
    // TODO: Alerts
    const paper = {
      name: this.name,
      link: this.link,
      understanding: [false, false, false, false, false],
    };
    const sectionIdx = this.sections.indexOf(this.section);

    if (sectionIdx === -1) {
      this.project.sections.push({
        name: this.section,
        papers: [paper],
      })
    } else {
      this.project.sections[sectionIdx].papers.push(paper);
    }
    console.log(this.projectId);
    this.projectService.saveProject(this.project);
    this.router.navigate(['/project-view'], 
        { queryParams: { 'project-id': this.projectId } })
  }
}
