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
    constructor(private http:HttpClient){}

    getUserbyEmailAndPassword(username : string, pass : string) : Observable<UserInterface>{
        const body = {
            username : username,
            password : pass
        }
        // TO-DO: tratar el error 500
        return this.http.post<UserInterface>(this.loginUrl, body);
    }

    getIsLogged() : Boolean{
        return this.isLogged;
    }

    
}