import { Component } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
    eobj!:Employee
    ngOnInit()
    {
      this.eobj= new Employee();
    }

    onSubmit(){
      console.log("Employee : "+this.eobj.empName);
    }
}
