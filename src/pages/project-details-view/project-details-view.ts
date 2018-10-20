import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';



/**
 * Generated class for the ProjectDetailsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-details-view',
  templateUrl: 'project-details-view.html',
})
export class ProjectDetailsViewPage {

  items:any;

  constructor(public navCtrl: NavController, public http: HttpClient, private authService: AuthService) {
    this.getProjectDetails();
  }

  getProjectDetails() {
    let url= this.authService.apiUrl+'/node/'+this.authService.SelectedNID+'?_format=json';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.items = result;
      console.log(result);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailsViewPage');
  }

}
