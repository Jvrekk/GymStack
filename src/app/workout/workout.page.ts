import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage {
  public bodyParts = []
  public name: string;
  public sub: any;
  public obj: any;
  public objLast: any;
  public sets:number = null;
  public weight:number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage   
  ) {  }

  Add(){
    let counter = this.sets*this.weight+this.obj;
    console.log(this.sets*this.weight);
    if(this.sets*this.weight>0){
      let interval = setInterval(() =>{
        this.obj++
        if(this.obj==counter) 
          clearInterval(interval);
      },2)
      this.storage.set(this.name+'now',counter);
    }
    
    this.sets=null;
    this.weight=null;
  }
  Finish(){
    let counter = this.obj;
    this.storage.set(this.name,this.obj);
    if(counter!=0){
      let interval = setInterval(() =>{
        if(this.objLast>counter)
          this.objLast--;
        else
        this.objLast++
        if(this.objLast==counter) 
          clearInterval(interval);
      },2)
    }

    this.obj = 0;
    
    this.storage.set(this.name+'now',0);
  }
  Load(){
    this.storage.get(this.name).then((val)=>{
      (val==null)?this.objLast = 0 : this.objLast = val;
    })
    this.storage.get(this.name+'now').then((val)=>{
      (val==null)?this.obj = 0 : this.obj = val;
    })
  }
  checkFocus(){

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.name = params['name']; 
       if(this.name=='')
         this.name='workout';
    });

    

    switch(this.name){
      case 'arms':
        this.bodyParts = ['biceps','triceps','shoulders'];
        break;
      case 'legs':
        this.bodyParts = ['squats','lunges','calves'];
        break;
      case 'chest':
        this.bodyParts = ['Barbell','dumbbell','Crossover'];
        break;
      case 'back':
        this.bodyParts = ['Deadlift','PullUps'];
        break;
      case 'workout':
        this.bodyParts = ['arms','legs','back','chest']
        break;
      default:
        this.bodyParts = [];
        this.Load();
    }
  }



}
