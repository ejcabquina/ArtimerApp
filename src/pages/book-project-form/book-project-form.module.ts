import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookProjectFormPage } from './book-project-form';

@NgModule({
  declarations: [
    BookProjectFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BookProjectFormPage),
  ],
})
export class TabsPageModule {}
