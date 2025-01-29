import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,NgFor,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskList: Task[] = [];
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.fetchTasks().subscribe(tasks => (this.taskList = tasks));
  }

  fetchTaskDetails(taskId: number): void {
    this.router.navigate([`/task`, taskId]);
  }
}
