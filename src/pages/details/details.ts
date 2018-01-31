import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public animal;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animal = navParams.get('data');
  }


}
