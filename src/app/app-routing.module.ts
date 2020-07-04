import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { AddResourceComponent } from './project/project-detail/add-resource/add-resource.component';


const routes: Routes = [
  {path: '', component: ProjectListComponent},
  {path: 'project-view', component: ProjectDetailComponent},
  {path: 'add-resource', component: AddResourceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
