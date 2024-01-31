import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { AuthService } from '../service/auth.service';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  idform:any;
  id:any;
  formation:any;
  session:any[]=[];
  train:any;
 constructor( private serv:FormationService, private sess:SessionService, private au:AuthService){};

 ngOnInit(){


this.appformation();
this.appsession();
this.gettraine();


 }
 /*islogin(){
   return this.au.isLoggedIn();
 }*/
 appformation(){
  this.id = this.au.getuserloc();

this.sess.getsessions().subscribe((data:any)=>{
  this.session=data;
  for (let c of this.session) {
    console.log(c);
    
    if ((this.id)== c.participants){
    
      // this.idform=;
      this.serv.getFormationbyid(c.formation_id).subscribe((data:any )=>{
        this.formation =data
       })
    
    }


    }
  
 })
 
 
 
  


  
 
}
 appsession(){

 }
 gettraine(){
this.au.gettrainer(this.id).subscribe((data:any)=>{
this.train=data
})
}

}