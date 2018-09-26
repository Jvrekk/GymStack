import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  public BMI:number = 0;
  public weight:number;
  public height:number;
  constructor(
    private storage:Storage, 
    private navCtrl:NavController
  ){ 
    
   }
   loadData(){
    this.storage.get('data').then((val) => {
      let data = JSON.parse(val);
      this.height = +data[0].height;
      this.weight = +data[0].weight;
      this.BMI = (this.weight/(this.height*this.height))*10000;
      console.log('załadowano dane');
    });
   }
   update(){
    this.storage.get('data').then((val) => {
      let data = JSON.parse(val);
      this.height = +data[0].height;
      this.BMI = (this.weight/(this.height*this.height))*10000;
      console.log('update');
    });
    this.storage.set('weight', this.weight);
   }
  ngOnInit(){
    this.storage.get('first_time').then((val) => {
      if (val !== null) {
         console.log('not first time');
         this.storage.set('n',0);
      } else {
         console.log('first time');
         this.storage.set('first_time', true)
         this.navCtrl.navigateForward('welcome');
      }
   });
   this.loadData()

  

  }
}
