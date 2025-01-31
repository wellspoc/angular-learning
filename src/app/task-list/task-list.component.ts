import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';
import { TNMServiceService } from '../tnmservice.service';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskList: Task[] = [];
  paginatedTaskList: Task[] = []; // Current page's tasks
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 1;
  totalTasks: number = 0; // To bind to mat-paginator length
  displayedColumns: string[] = ['index', 'name', 'owner', 'status', 'date']; // Column definitions for mat-table

  constructor(private tnmService: TNMServiceService, private router: Router) {}

  ngOnInit(): void {
    // Fetch tasks from the service
    this.tnmService.fetchTasks().subscribe(tasks => {
      this.taskList = tasks;
      this.totalTasks = tasks.length; // Set total tasks for paginator
      this.totalPages = Math.ceil(this.totalTasks / this.itemsPerPage);
      this.updatePaginatedList();
    });
  }

  fetchTaskDetails(taskId: number): void {
    this.router.navigate([`/task`, taskId]);
  }

  updatePaginatedList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTaskList = this.taskList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(event: any): void {
    this.currentPage = event.pageIndex + 1; // Adjust the currentPage based on pagination event
    this.itemsPerPage = event.pageSize; // Adjust itemsPerPage when page size is changed
    this.updatePaginatedList(); // Update the paginated list based on the new page and page size
  }
}
