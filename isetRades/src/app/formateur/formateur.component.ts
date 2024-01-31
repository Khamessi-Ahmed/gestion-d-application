import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { AuthService } from '../service/auth.service';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
  
  id:any;
  idsses:any;

  formation:any;
  session:any[]=[];
  train:any;
 constructor( private serv:FormationService, private sess:SessionService, private au:AuthService){};
 lesformations: any[] = [];
 nouvelleFormation: any = {
  titre: '',
  description: '',
  // ... autres propriétés
};
 ngOnInit(){


    
    this.getFormations();
  





 }



getFormations() {
  this.serv.getFormation().subscribe((data) => {
    this.lesformations = data;
  });
}

deleteFormation(id: any) {
  this.serv.deleteFormation(id).subscribe(
    () => {
      this.lesformations = this.lesformations.filter((formation) => formation.id !== id);
    },
    (error) => {
      console.error('Error deleting formation:', error);
    }
  );
}
addFormation() {
  this.serv.addFormation(this.nouvelleFormation).subscribe(
    (newFormation) => {
      this.lesformations.push(newFormation);
      this.nouvelleFormation = {
        titre: '',
        description: '',
        // ... autres propriétés
      };
    },
    (error) => {
      console.error('Error adding formation:', error);
    }
  );
}

}