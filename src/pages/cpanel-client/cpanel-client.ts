import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { HomePage } from '../home/home';
import { ProjectPostForm } from '../project-post-form/project-post-form';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'cpanel-client',
  templateUrl: 'cpanel-client.html'
})
export class CPanelClient {
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
    this.navCtrl.push(ProjectPostForm);
  }

  gotoEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }
}
