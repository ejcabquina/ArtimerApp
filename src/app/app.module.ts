import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProjectListPage } from '../pages/project-list/project-list';
import { ProjectDetailsViewPage } from '../pages/project-details-view/project-details-view';
import { ProjectPostFormPage } from '../pages/project-post-form/project-post-form';
import { RegisterPage } from '../pages/register/register';
import { CPanelDesignerPage } from '../pages/cpanel-designer/cpanel-designer';
import { CPanelClientPage } from '../pages/cpanel-client/cpanel-client';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { BookingStatusPage } from '../pages/booking-status/booking-status';
import { BookingStatusViewPage } from '../pages/booking-status-view/booking-status-view';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { BrowseProfilePage } from '../pages/browse-profile/browse-profile';
import { MessengerPage } from '../pages/messenger/messenger';
import { NotificationPage } from '../pages/notification/notification';
import { CreativeBriefFaqPage } from '../pages/creative-brief-faq/creative-brief-faq';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProjectListPage,
    ProjectDetailsViewPage,
    ProjectPostFormPage,
    RegisterPage,
    CPanelDesignerPage,
    CPanelClientPage,
    EditProfilePage,
    BookingStatusPage,
    BookingStatusViewPage,
    AccountSettingsPage,
    BrowseProfilePage,
    MessengerPage,
    NotificationPage,
    CreativeBriefFaqPage
  ],
  imports: [
    BrowserModule,HttpClientModule, HttpModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProjectListPage,
    ProjectDetailsViewPage,
    ProjectPostFormPage,
    RegisterPage,
    CPanelDesignerPage,
    CPanelClientPage,
    EditProfilePage,
    BookingStatusPage,
    BookingStatusViewPage,
    AccountSettingsPage,
    BrowseProfilePage,
    MessengerPage,
    NotificationPage,
    CreativeBriefFaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
