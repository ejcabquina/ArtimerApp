import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { ProjectDetailsViewPage } from '../project-details-view/project-details-view'
import { projection } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html'
})
export class ProjectListPage {
  public items:any;
  public selectedNID:any;
 
  constructor(public navCtrl: NavController, public http: HttpClient, private authService: AuthService) {
    this.getProject();
  }

  getProject() {
    let url= this.authService.apiUrl+'/rest/projects?_format=json';
    let data: Observable<any> = this.http.get(url);
    data.map(result => {
      this.items = result;
      console.log(result);
      
    });
  }

  gotoHomePage() {
    this.navCtrl.push(HomePage);
  }

  gotoProjectDetailsViewPage(data){
    this.authService.assignSelectedNID(data);
    this.navCtrl.push(ProjectDetailsViewPage);
  }
  
}