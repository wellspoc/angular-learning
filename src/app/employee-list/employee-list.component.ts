import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employee!:Employee[];

  constructor(private empervice:EmployeeServiceService,private router:Router,private aroute:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.reloadData();
  }
  reloadData()
  {
    this.empervice.getEmployee().subscribe(emparr=>
    {
      this.employee=emparr;
    }
    )
  }
}
