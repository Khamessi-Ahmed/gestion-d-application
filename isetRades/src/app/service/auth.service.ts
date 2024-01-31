import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError, map } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any; 
  alluser=<any>[];
  userUrl="../../assets/db.json";
 users=" http://localhost:3000/users";
  constructor(private http:HttpClient) { }
  login(username:any,password:any){
      return this.http.get<any>(this.userUrl).pipe(map((data)=>{
        this.alluser=data;
        const users=data.users.find((user:any)=>
        (user.username===username && user.password===password));
        if(users){
          window.localStorage.setItem("accessToken",users.accessToken);
          window.localStorage.setItem("userId",users.id);
          window.localStorage.setItem("userRole",users.role);
          return true;
        }
        else{
          return false;
        }
      }))

  }
  logOut(){
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userRole");
  }
  isLoggedIn():boolean{
    return !!window.localStorage.getItem("accessToken")
  }
  getUserRole() {
    return window.localStorage.getItem('userRole');
  }
  getuserloc(){
    return window.localStorage.getItem('userId');
  }
  getUser(){
    return this.users;
  }
  getUsers() {
    return this.http.get<any>(this.userUrl);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.users}/${userId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError('User deletion failed');
      })
    );
  }
  editUser(id: any, updatedUser: any): Observable<any> {
    const url = `${this.users}/${id}`;
    return this.http.put(url, updatedUser).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError('User update failed');
      })
    );
  }

  
  
  
  

  addUser(user: any): Observable<any> {
    return this.http.post(this.users, user).pipe(
      catchError((error) => {
        console.error('Error adding user:', error);
        return throwError('User addition failed');
      })
    );
  }
  
   gettrainer (id: any) {
    const url=`${this.users}/${id}`;
    return this.http.get<any[]>(url);
 }

 getta7ayol(){
  return this.alluser;



 }











 setformation(formation: any): Observable<any> {
  const userId = this.getuserloc();

  return this.http.get<any>(`${this.users}/${userId}`).pipe(
    mergeMap((userData) => {
      // Assurez-vous que userData et userData.formations sont définis
      if (userData && userData.formations) {
        // Ajoutez la nouvelle formation aux formations de l'utilisateur
        userData.formations.push(formation);

        // Mettez à jour les données de l'utilisateur avec les nouvelles formations
        return this.http.put(`${this.users}/${userId}`, userData).pipe(
          mergeMap(() => {
            // Renvoie une observable vide après la mise à jour réussie
            return new Observable();
          })
        );
      } else {
        console.error('Les données de l\'utilisateur ne sont pas valides :', userData);
        throw new Error('Invalid user data');
      }
    })
  );
}



 getUserData(): Observable<any> {
  // Obtenez l'ID de l'utilisateur actuellement connecté
  const userId = this.getuserloc();

  // Effectuez une requête HTTP GET pour obtenir les données de l'utilisateur
  return this.http.get(`${this.users}/${userId}`).pipe(
    catchError((error) => {
      console.error('Error getting user data:', error);
      return throwError('Failed to get user data');
    })
  );
 }











}













 
   





function switchMap(arg0: (userData: any) => Observable<Object>): import("rxjs").OperatorFunction<any, any> {
  throw new Error('Function not implemented.');
}

