import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ProjectList } from '../pages/project-list/project-list';
import { ProjectPostForm } from '../pages/project-post-form/project-post-form';
import { Register } from '../pages/register/register';
import { CPanelDesigner } from '../pages/cpanel-designer/cpanel-designer';
import { CPanelClient } from '../pages/cpanel-client/cpanel-client';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    ProjectList,
    ProjectPostForm,
    Register,
    CPanelDesigner,
    CPanelClient,
    EditProfilePage
  ],
  imports: [
    BrowserModule,HttpClientModule, HttpModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    ProjectList,
    ProjectPostForm,
    Register,
    CPanelDesigner,
    CPanelClient,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
