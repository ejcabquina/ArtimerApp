import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TOSPage } from './tos';

@NgModule({
  declarations: [
    TOSPage,
  ],
  imports: [
    IonicPageModule.forChild(TOSPage),
  ],
})
export class TosPageModule {}
