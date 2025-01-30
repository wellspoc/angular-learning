import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDetail } from '../task-detail';
import { Router } from '@angular/router';
import { TNMServiceService } from '../tnmservice.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  query !:String;
  ruleName!:String;
  id!: number;
  showAcceptButton: boolean = false; 
  showRejectButton : boolean = false; 
  showRewriteButton : boolean = false; 
  task = new TaskDetail();
  status!:String;
  disabledTextAreaContent = `Find the list of new users who has applied for homeloan last month

  Questions
  • Credit Score should be above 750
  • Monthly income should be more than 20000 USD`;
  constructor(
    private tnmService: TNMServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tnmService.fetchTaskDetails(this.id).subscribe(tasks => {
      Object.assign(this.task = tasks);
      if(this.task.role == 'Reviewer' && this.task.status!= 'Completed'){
        this.showAcceptButton= true; 
        this.showRejectButton = true; 
      }
      else if(this.task.status!= 'Completed'){
        this.showRewriteButton=true;
      }
      this.query= this.task.query;
      this.ruleName= this.task.ruleName;

    });
  }
  userResponse(status: String): void {
    this.task.status= status;
    this.tnmService.updateTask(this.task).subscribe(taskId =>{
      this.router.navigate([`/taskList`]);
    });
  }
}
