import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-forms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-forms.component.html',
  styleUrl: './login-forms.component.css'
})
export class LoginFormsComponent {
  username!: String;
  password!: String;
  
  ngOnInit()
    {
      this.username= "admin";
      this.password="passowrd";
    }
  onSubmit(){
    if(this.username == this.password){
      alert("This is same");
    }
    else{
      alert("This is not same");
    }
  }
}
