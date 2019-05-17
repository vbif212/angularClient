import {Component} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginData = {username: '', password: ''};

  constructor(private service: AppService) {
  }

  login() {
    this.service.obtainAccessToken(this.loginData);
  }

}
