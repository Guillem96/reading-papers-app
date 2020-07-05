import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCardComponent } from './project/project-list/project-card/project-card.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { AddResourceComponent } from './project/project-detail/add-resource/add-resource.component';
import { FormsModule } from '@angular/forms';
import { CreateProjectComponent } from './project/create-project/create-project.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailComponent,
    AddResourceComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
