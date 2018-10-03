import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { HomePage } from '../home/home';
import { ProjectPostFormPage } from '../project-post-form/project-post-form';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { BookingStatusPage } from '../booking-status/booking-status';
import { AccountSettingsPage } from '../account-settings/account-settings';

import { BrowseProfilePage } from '../browse-profile/browse-profile';
import { MessengerPage } from '../messenger/messenger';
import { NotificationPage } from '../notification/notification';
import { CreativeBriefFaqPage } from '../creative-brief-faq/creative-brief-faq';

@Component({
  selector: 'page-cpanel-client',
  templateUrl: 'cpanel-client.html'
})
export class CPanelClientPage {
  public items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.getData();
  }

  getData() {
    let url='';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.items = result;
      console.log(result);
    })
  }


  gotoHomePage() {
    this.navCtrl.push(HomePage);
  }

  gotoProjectPostForm() {
    this.navCtrl.push(ProjectPostFormPage);
  }

  gotoBrowseProfile(){
    this.navCtrl.push(BrowseProfilePage);
  }

  gotoMessenger(){
    this.navCtrl.push(MessengerPage);
  }

  gotoNotification(){
    this.navCtrl.push(NotificationPage);
  }

  gotoEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  gotoBookingStatus(){
    this.navCtrl.push(BookingStatusPage);
  }

  gotoAccountSettings(){
    this.navCtrl.push(AccountSettingsPage);
  }

  gotoCreativeBriefFAQPage(){
    this.navCtrl.push(CreativeBriefFaqPage)
  }
  
}
