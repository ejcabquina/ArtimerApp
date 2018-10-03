import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingStatusPage } from './booking-status';

@NgModule({
  declarations: [
    BookingStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingStatusPage),
  ],
})
export class BookingStatusPageModule {}
