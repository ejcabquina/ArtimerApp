import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingStatusViewPage } from './booking-status-view';

@NgModule({
  declarations: [
    BookingStatusViewPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingStatusViewPage),
  ],
})
export class BookingStatusViewPageModule {}
