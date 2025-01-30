import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';
import { TNMServiceService } from '../tnmservice.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,NgFor,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskList: Task[] = [];
  constructor(private tnmService: TNMServiceService, private router: Router) {}

  ngOnInit(): void {
    this.tnmService.fetchTasks().subscribe(tasks => (this.taskList = tasks));
  }

  fetchTaskDetails(taskId: number): void {
    this.router.navigate([`/task`, taskId]);
  }
}
