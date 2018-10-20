import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { BookingStatusPostedPage } from '../booking-status-posted/booking-status-posted';
import { BookingStatusTakenPage } from '../booking-status-taken/booking-status-taken';

/**
 * Generated class for the BookingStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-booking-status',
  templateUrl: 'booking-status.html',
})
export class BookingStatusPage {

  tab1Root = BookingStatusPostedPage;
  tab2Root = BookingStatusTakenPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingStatusPage');
  }

}
