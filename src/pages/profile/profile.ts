import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, SegmentButton, Segment } from 'ionic-angular';


import { HttpClient, } from '@angular/common/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

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
  button: any;
  
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

  toggleRating() {
    this.button.open = this.button.close;
  }
 
  toggleComment(i, j) {
    this.ratings[i].children[j].open = !this.ratings[i].children[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

 
}
