import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProjectListPage } from '../project-list/project-list';



@Component({
  selector: 'page-cpanel',
  templateUrl: 'cpanel.html'
})
export class CPanelPage {

  displayImage: any;
  displayFirstName: any;
  displayLastName: any;
  displayCountry: any;
  displayRegion: any;
  displayCity: any;
  displayDesc: any;
  displayEmail: any;
  displayMobile: any;


  
  constructor( public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private authService: AuthService) {
    if(!localStorage.getItem('loggedin_token')) {
      authService.isLoggedIn = false;
    }
    this.readUserfromAuth();
    }
  
    readUserfromAuth(){
      this.authService.loadUserData().subscribe(data => {
        console.log('data',data);
        this.displayImage = this.authService.displayImg;
        this.displayFirstName = this.authService.displayFirstName;
        this.displayLastName = this.authService.displayLastName;
        this.displayCountry = this.authService.displayCountry;
        this.displayRegion = this.authService.displayRegion;
        this.displayCity = this.authService.displayCity;
        this.displayMobile = data.field_mobile_number;
        this.displayDesc = data.field_short_description; 
        this.displayEmail = data.mail;
        
      });
    }
  
  gotoHomePage() {
    this.navCtrl.push(HomePage);
  }

  gotoProjectPostForm() {
    this.navCtrl.push(ProjectPostFormPage);
  }

  gotoProjectList() {
    this.navCtrl.push(ProjectListPage);
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

  gotoProfilePage(){
    this.navCtrl.push(ProfilePage)
  }
  
}
