import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  errorMsg : string = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isLogged = false;
  }
  public onSubmit(): void {
    this.login()
  }

  login() {
    console.log(this.username + ', ' + this.password);
    this.userService
      .getUserbyEmailAndPassword(this.username, this.password)
      .subscribe(
        (data) => {
          if (data.userId) {
            sessionStorage.setItem('user', JSON.stringify(data));
            this.userService.isLogged = true;
            this.navigateTo();
          }
        },
        (err) => {
          this.handleError(err);
        }
      );
  }

  handleError(error: any) {
    if (error.status === 500) {
      //  Show error message
      this.errorMsg = "El usuario no existe"
    }
  }

  navigateTo(){
    this.router.navigate(['/dashboard']);
  }


}
