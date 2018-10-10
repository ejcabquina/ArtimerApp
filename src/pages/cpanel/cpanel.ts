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



@Component({
  selector: 'page-cpanel',
  templateUrl: 'cpanel.html'
})
export class CPanelPage {

  displayImage: any;
  displayName: any;
  displayInfo: any;
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
        this.displayImage = data.user_picture;
        this.displayName = data.field_name;
        this.displayInfo = data.field_address; 
        this.displayMobile = data.field_mobile;
        this.displayDesc = data.field_short_description; 
        this.displayEmail = data.mail;
        console.log('info editprofile',this.displayInfo);
        console.log('name editprofile',this.displayName);
        console.log('mobile editprofile',this.displayMobile);
        console.log('img editprofile',this.displayImage);
        console.log('email editprofile',this.displayEmail);
        console.log('desc editprofile',this.displayDesc);
      });
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

  gotoProfilePage(){
    this.navCtrl.push(ProfilePage)
  }
  
}
