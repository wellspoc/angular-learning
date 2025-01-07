import { Component } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-kie-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kie-server.component.html',
  styleUrl: './kie-server.component.css'
})
export class KieServerComponent {
  messageData!:JSON;
  serverInfo!:String;

  constructor(private empervice:EmployeeServiceService,private router:Router,private aroute:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.reloadData();
  }
  reloadData()
  {
    this.empervice.getInfo().subscribe(emparr=>
    {
      this.messageData=emparr;
    }
    )
  }
}
