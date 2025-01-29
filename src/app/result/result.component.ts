import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  disabledTextAreaContent = `Find the list of new users who has applied for homeloan last month

  Questions
  • Credit Score should be above 750
  • Monthly income should be more than 20000 USD`;
  query !:String;
  ruleName!:String;
  id!: number;
  ngOnInit(): void {
  }
}
