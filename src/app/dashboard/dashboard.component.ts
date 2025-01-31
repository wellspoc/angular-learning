import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TNMServiceService } from '../tnmservice.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tnmService: TNMServiceService, private router: Router) {}

  ngOnInit(): void {
    this.tnmService.fetchRules().subscribe(rules => {
      this.dataSource.data = rules;
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }

  fetchRuleDetails(ruleId: number): void {
    this.router.navigate(['/ruleBuilder'], {
      queryParams: {
        source: 'dashboard',
        id: ruleId
      }
    });    
  }
  executeRule(ruleId: number): void {
    this.router.navigate(['/result'], {
      queryParams: {
        id: ruleId
      }
    });
  }
}
