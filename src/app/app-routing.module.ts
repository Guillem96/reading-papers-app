import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { AddResourceComponent } from './project/project-detail/add-resource/add-resource.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';


const routes: Routes = [
  {path: '', component: ProjectListComponent},
  {path: 'project-view', component: ProjectDetailComponent},
  {path: 'add-resource', component: AddResourceComponent},
  {path: 'add-project', component: CreateProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
