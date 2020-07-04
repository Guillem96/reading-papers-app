import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public project: any = null;
  private sub: any;

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
      });
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
    this.project = JSON.parse(JSON.stringify(this.project));
    this.projectService.saveProject(this.project);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
