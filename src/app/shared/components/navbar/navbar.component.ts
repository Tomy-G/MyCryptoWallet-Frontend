import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/public/login/models/user.model';
import { UserService } from 'src/app/public/login/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  // user: string | null = sessionStorage.getItem('user');
  // userData : UserInterface = JSON.parse(sessionStorage.getItem('user') || '{}') as UserInterface;
  userData : UserInterface;
  constructor(public router: Router, private userService : UserService) { }

  ngOnInit(): void {
    console.log("El usuario: " + this.userData)

    if(this.userData!=null){
      this.login=false;
    }else{
      this.login=true;
    }
  }

  isLogged() : Boolean {
    return this.userService.getIsLogged();
  }

  navigateToLogin(): void{
    this.router.navigate(['']);
  }

  logout(): void{
    sessionStorage.removeItem("user");
    this.login = false;
    this.userService.isLogged = false;
    this.navigateToLogin();
  }

  getCurrentUser() : UserInterface {
    this.userData = this.userService.getCurrentUser();
    return this.userData;
  }



}
