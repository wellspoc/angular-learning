import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rule } from '../rule';
import { TNMServiceService } from '../tnmservice.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ruleList: Rule[] = [];

  constructor(private tnmService: TNMServiceService, private router: Router) {}

  ngOnInit(): void {
    this.tnmService.fetchRules().subscribe(rules => (this.ruleList = rules));
  }

  fetchRuleDetails(ruleId: number): void {
    this.router.navigate([`/ruleBuilder`, ruleId]);
  }
}
