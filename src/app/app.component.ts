import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ProjectPostFormPage } from '../pages/project-post-form/project-post-form';
import { RegisterPage } from '../pages/register/register';
import { CPanelDesignerPage } from '../pages/cpanel-designer/cpanel-designer';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { BookingStatusPage } from '../pages/booking-status/booking-status';
import { BookingStatusViewPage } from '../pages/booking-status-view/booking-status-view';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { BrowseProfilePage } from '../pages/browse-profile/browse-profile';
import { MessengerPage } from '../pages/messenger/messenger';
import { NotificationPage } from '../pages/notification/notification';
import { CreativeBriefFaqPage } from '../pages/creative-brief-faq/creative-brief-faq';
import { ProfilePage } from '../pages/profile/profile';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

