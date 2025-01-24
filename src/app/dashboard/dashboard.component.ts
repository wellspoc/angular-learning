import { Component } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rule } from '../rule';
import { Rules } from '../rules';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ruleList!:Rule[];
  rule!:Rules;
  ngOnInit(){
    this.empervice.fetchRules().subscribe(emparr=>
      {
        this.ruleList= emparr;
      }
      )
     
  }
  constructor(private empervice:EmployeeServiceService,private router:Router,private aroute:ActivatedRoute)
  {

  }
  fetchRuleDetails(ruleId: number) {
    this.router.navigate([`/ruleBuilder`,ruleId]);  
  }

}
