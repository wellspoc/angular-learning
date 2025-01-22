import { Component } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rules } from '../rules';

@Component({
  selector: 'app-rule-builder',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './rule-builder.component.html',
  styleUrl: './rule-builder.component.css'
})
export class RuleBuilderComponent {
  tableList!:String[];
  selectedTable!:String;
  selectedColumn!:String[];
  columnList!:String[];
  query!:String;
  ruleName!:String;
  rule = new Rules();
  id!:number;
  constructor(private empervice:EmployeeServiceService,private router:Router,private aroute:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.reloadData();
    this.selectedTable=this.tableList[0];
    this.onTableChange();
    this.query = "select * from "+this.selectedTable;
  }
  reloadData()
  {
    this.empervice.getTables().subscribe(emparr=>
    {
      this.tableList=emparr;
    }
    )
  
  }

  onTableChange() {
    this.empervice.getColumns(this.selectedTable).subscribe(emparr=>
      {
        this.columnList=emparr;
      }
      )
      this.query = "select * from "+this.selectedTable;
  }
  onColumnsChange(){
    console.log(this.selectedColumn);
    if(this.selectedColumn.length>0){
      this.query = "select "+this.selectedColumn+" from "+this.selectedTable;
    }
    else{
      this.query = "select * from "+this.selectedTable;
    }
  }

  saveRule(){
   
    this.rule.ruleName = this.ruleName;
    this.rule.isActive = true;
    this.rule.status = 0;
    this.rule.tableName=this.selectedTable;
    this.rule.sqlQuery=this.query;

    this.empervice.save(this.rule).subscribe(ruleObject=>
      {
        this.id=ruleObject;
        alert("The rule is saved with id : "+this.id);
      }
      )
  }
}
