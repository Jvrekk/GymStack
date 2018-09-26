import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {  
  public weight;
  public height;
  constructor(
    public toast: ToastController, 
    private storage:Storage, 
    private navCtrl: NavController, 
    public service:DataService
  ){
    this.storage.get('height').then((height)=>{
      this.height = height
    })
    this.storage.get('weight').then((weight)=>{
      this.weight = weight
    })
  }

  public async save(){
    this.storage.set('height', this.height);
    this.storage.set('weight', this.weight);
    var d = new Date();
    let dataArray = [
      {
        date:d.getMonth() +','+ d.getDay(),
        weight: +this.weight,
        height: +this.height
      }
    ]
    this.storage.set('data', JSON.stringify(dataArray));
    const message = await this.toast.create({
      message: "Zapisano zmiany",
      position: 'top',
      duration: 1000,
      cssClass: "toastMsg"
    });
    message.present();
  }

  ngOnInit() {
  }

}
