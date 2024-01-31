import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../service/formation.service';
import { SessionService } from '../service/session.service';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
   id:number=0
   formation:any;
   session:any;
   train:any;
   user:any;
  constructor(private route: ActivatedRoute, private serv:FormationService, private sess:SessionService, private au:AuthService,private http: HttpClient){};

  ngOnInit(){
    this.au.getUserData().subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );

    this.route.params.subscribe((param)=>
    {
      this.id=+param['id']
    }
    )

this.appformation();
this.appsession();
this.gettraine();


  }
  islogin(){
    return this.au.isLoggedIn();
  }
  appformation(){

   this.serv.getFormationbyid(this.id).subscribe((data:any )=>{
    this.formation =data
   }
   )
   
  }
  appsession(){
   this.session= this.sess.getsession(this.id).subscribe((data:any)=>{
    this.session=data
   })
   
  }
  gettraine(){
this.au.gettrainer(this.id).subscribe((data:any)=>{
this.train=data
})
  }
  inscrti() {
    this.session.registerCandidat++;
    this.sess.inscrit(this.session.id);
  
    // Ajoutez la nouvelle formation aux formations de l'utilisateur
    this.au.setformation(this.formation.titre).subscribe(
      () => {
        console.log('User updated successfully');
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}




