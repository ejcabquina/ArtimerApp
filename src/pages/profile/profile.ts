import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HttpClient, } from '@angular/common/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { RatingPage } from '../rating/rating';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public ratings: any[];

  
  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
    this.getRating();
  }

  getRating() {
    let url='https://jsonplaceholder.typicode.com/comments';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.ratings = result;
      console.log(result);
    })
  }

  gotoRatingPage(){
    this.navCtrl.push(RatingPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

 

 
}
