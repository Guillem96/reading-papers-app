import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from './../../../projects.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  public project: any = null;
  public sections: string[] = [];
  private sub: any;
  public name: string;
  public link: string;
  public section: string;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  get projectId() {
    return this.project?.name.toLowerCase().replace(/ /g, '-');
  }
  
  ngOnInit(): void {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.project = this.projectService.getProjectData(params['project-id']);
        this.sections = this.project.sections.map(s => s.name);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public createResource() {
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
    this.projectService.saveProject(this.project);
  }
}
