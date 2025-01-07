import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  bookobj=new Employee();
  constructor( private empService:EmployeeServiceService,private router:Router)
  {
  }
  addBook()
{
  console.log("Book code entered by user is "+this.bookobj.empId);
  console.log("Title is "+this.bookobj.empName)
  this.empService.insertEmployee(this.bookobj).subscribe(book=>
  {
    console.log("Data inserted "+book.empName)
    this.router.navigate(["/EmployeeList"]);
  });
}
}
