import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ProjectList } from '../pages/project-list/project-list';
import { ProjectPostForm } from '../pages/project-post-form/project-post-form';
import { Register } from '../pages/register/register';
import { CPanelDesigner } from '../pages/cpanel-designer/cpanel-designer';
import { CPanelClient } from '../pages/cpanel-client/cpanel-client';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

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

