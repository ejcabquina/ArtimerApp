import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseProfilePage } from './browse-profile';

@NgModule({
  declarations: [
    BrowseProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseProfilePage),
  ],
})
export class BrowseProfilePageModule {}
