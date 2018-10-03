import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { HomePage } from '../home/home';

@Component({
  selector: 'project-list',
  templateUrl: 'project-list.html'
})
export class ProjectList {
  public items:any;
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getData();
  }
  getData() {
    let url='https://jsonplaceholder.typicode.com/photos';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.items = result;
      console.log(result);
    })
  }

  gotoHomePage():void {
    this.navCtrl.push(HomePage);
  }
}