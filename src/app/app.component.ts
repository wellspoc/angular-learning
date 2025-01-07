import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { UserSignInComponent } from "./user-sign-in/user-sign-in.component";
import { LoginComponent } from "./user-auth/login/login.component";
import {  NgFor } from '@angular/common';
import { Employee } from './employee';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, UserSignInComponent, LoginComponent,NgFor,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
[x: string]: any;
  title = 'angular-learning';
  getName(){
    alert('Function called');
  }
  getData(value:String){
    console.log("Event Occured "+value);
  }

  counter=0;
  getCounter(){
    this.counter++;
  }
  downCounter(){
    this.counter--;
  }

  show = true;
  boxValue="hArdIk";
  color="green";

  fruitsName:String[]=[
    "apple","banana","mango"
]

empError:Employee[]=[
  {
    "empId":1,
    "empName":"Hardik",
    "salary":25000
  }
]

}
