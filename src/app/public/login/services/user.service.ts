import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInterface } from "../models/user.model";

@Injectable({
    providedIn:"root"
})

export class UserService{
    public isLogged : boolean = false;
    private loginUrl:string = "http://localhost:5000/api/users/login"
    userData : UserInterface;

    constructor(private http:HttpClient){
        this.getCurrentUser();
    }

    getUserbyEmailAndPassword(username : string, pass : string) : Observable<UserInterface>{
        const body = {
            username : username,
            password : pass
        }
        return this.http.post<UserInterface>(this.loginUrl, body);
    }

    getIsLogged() : Boolean{
        return this.isLogged;
    }

    getCurrentUser() : UserInterface {
        this.userData = JSON.parse(sessionStorage.getItem('user') || '{}') as UserInterface;
        if(Object.keys(this.userData).length === 0){
            this.isLogged = false;
        }else{
            this.isLogged = true;
        }
        return this.userData;
    }

    reloadUserData(){
        
    }

    
}