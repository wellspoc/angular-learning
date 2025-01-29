import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rule } from '../rule';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ruleList: Rule[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.fetchRules().subscribe(rules => (this.ruleList = rules));
  }

  fetchRuleDetails(ruleId: number): void {
    this.router.navigate([`/ruleBuilder`, ruleId]);
  }
}
