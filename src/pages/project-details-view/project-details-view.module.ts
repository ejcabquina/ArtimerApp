import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailsViewPage } from './project-details-view';

@NgModule({
  declarations: [
    ProjectDetailsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailsViewPage),
  ],
})
export class ProjectDetailsViewPageModule {}
