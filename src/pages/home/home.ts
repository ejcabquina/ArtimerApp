import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { CPanelPage } from '../cpanel/cpanel';

import { EditProfilePage } from '../edit-profile/edit-profile';

import { AccountSettingsPage } from '../account-settings/account-settings';
import { BrowseProfilePage } from '../browse-profile/browse-profile';
import { CreativeBriefFaqPage } from '../creative-brief-faq/creative-brief-faq';
import { ProfilePage } from '../profile/profile';
import { TOSPage } from '../tos/tos';

import { MessengerPage } from '../messenger/messenger';
import { NotificationPage } from '../notification/notification';



import { ProjectPostFormPage } from '../project-post-form/project-post-form';
import { ProjectListPage } from '../project-list/project-list';
import { ProjectDetailsViewPage } from '../project-details-view/project-details-view';

import { BookingStatusPage } from '../booking-status/booking-status';
import { BookingStatusViewPage } from '../booking-status-view/booking-status-view';
import { BookProjectFormPage } from '../book-project-form/book-project-form';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
  export class HomePage {
    constructor(public navCtrl: NavController,public menuCtrl: MenuController) {
      menuCtrl.enable(true);
    }

    openMenu() {
      this.menuCtrl.open();
    }
   
    gotoLogin() {
      this.navCtrl.push(LoginPage);
    }
  
    gotoRegister() {
      this.navCtrl.push(RegisterPage);
    }

    gotoCPanelPage(){
      this.navCtrl.push(CPanelPage)
    }
  
    gotoProfilePage(){
      this.navCtrl.push(ProfilePage)
    }

    
  gotoBrowseProfile(){ //inactive
    this.navCtrl.push(BrowseProfilePage);
  }

  gotoMessenger(){ //inactive
    this.navCtrl.push(MessengerPage);
  }

  gotoNotification(){ //inactive
    this.navCtrl.push(NotificationPage);
  }

  gotoEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  gotoAccountSettings(){
    this.navCtrl.push(AccountSettingsPage);
  }
  
  gotoProjectPostForm() { //the form where you post projects
    this.navCtrl.push(ProjectPostFormPage);
  }

  gotoProjectListPage() { //the view posted projects
    this.navCtrl.push(ProjectListPage);
  }

  gotoProjectDetailsViewPage(){ // if you click an item on project list page, you will go here
    this.navCtrl.push(ProjectDetailsViewPage)
  }

  gotoBookingStatus(){ // list of booked project, you see status here
    this.navCtrl.push(BookingStatusPage);
  }

  gotoBookingStatusViewPage(){ // booked project details
    this.navCtrl.push(BookingStatusViewPage)
  }

  gotoBookProjectFormPage(){ // this is sent by the designer. contains creative brief
    this.navCtrl.push(BookProjectFormPage)
  }

  gotoCreativeBriefFAQPage(){
    this.navCtrl.push(CreativeBriefFaqPage)
  }

  gotoTOSPage(){
    this.navCtrl.push(TOSPage)
  }
}