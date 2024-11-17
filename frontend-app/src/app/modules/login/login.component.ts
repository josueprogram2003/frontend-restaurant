import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { users } from '../../config/data';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  user:string = '';
  password:string = '';

  private router = inject(Router);
  
  logIn(){
    const data = users;
    const user = data.find(user => user.user === this.user && user.password === this.password);
    if(user){
      this.router.navigate(['/modules/restaurant'], { queryParams: user});
    }else{
      alert("Usuario o contraseña incorrectos");
    }
  }

}
