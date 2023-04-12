import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/public/login/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  user: string | null = sessionStorage.getItem('user');
  constructor(public router: Router, private userService : UserService) { }

  ngOnInit(): void {


    if(this.user!=null){
      this.login=false;
    }else{
      this.login=true;
    }
  }

  isLogged() : Boolean {
    return this.userService.getIsLogged();
  }

  navigateToLogin(){
    this.router.navigate(['']);
  }

}
