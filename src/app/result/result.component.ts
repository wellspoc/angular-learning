import { Component ,OnInit} from '@angular/core';
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
export class ResultComponent implements OnInit {
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
  header: string[] = [];
  dataList!:any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ruleName = params['ruleName'];
      this.query = params['query'];
      this.id = params['id'];
      this.header = params['columnName'];
    });
    this.employeeService.executeQuery(this.query).subscribe(resultset => { this.dataList=resultset
    });
  }
}
