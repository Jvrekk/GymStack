import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(public storage: Storage) { 
  }

}
