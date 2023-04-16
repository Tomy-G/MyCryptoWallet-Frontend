import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public username = '';
  // public password = '';

  username = new FormControl('', [Validators.required, Validators.minLength(5)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);


  errorMsg : string = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isLogged = false;
  }
  public onSubmit(): void {
    this.login()
  }

  login() {
    if(!this.username.hasError('minLength(5)') && !this.password.hasError('minLength(5)')){
      console.log(this.username + ', ' + this.password);
    this.userService
      .getUserbyEmailAndPassword(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          if (data.userId) {
            sessionStorage.setItem('user', JSON.stringify(data));
            console.log(data);
            this.userService.isLogged = true;
            this.navigateTo();
          }
        },
        (err) => {
          this.handleError(err);
        }
      );
    }
    
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
