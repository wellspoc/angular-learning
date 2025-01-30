import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TNMServiceService } from '../tnmservice.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  constructor(
    private tnmService: TNMServiceService,
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
    this.tnmService.executeQuery(this.query).subscribe(resultset => { this.dataList=resultset
    });
  }
}
