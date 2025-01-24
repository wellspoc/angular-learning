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
  disabledTextAreaContent: string = `Find the list of new users who has applied for homeloan last month\n \n Questions \n• Credit Score should be above 750 \n• Monthly income should be more than 20000 USD`;

  availableTables : string[]=[];
  selectedTables: string[]=[];
  
  selectedAvailableTables: string[] = []; // To store selected tables in Available list
  selectedSelectedTables: string[] = []; // To store selected tables in Selected list


  availableColumns : string[]=[];
  selectedColumns: string[]=[];
  
  selectedAvailableColumns: string[] = []; // To store selected tables in Available list
  selectedSelectedColumns: string[] = []; // To store selected tables in Selected list

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
    this.id=this.aroute.snapshot.params['id'];
    this.reloadData();
    if(this.id==0 || this.id == undefined){
     
    }
    else{
      this.empervice.fetchRuleDetails(this.id).subscribe(emparr=>
        {
          this.rule=emparr;
          this.ruleName= this.rule.ruleName;
          this.selectedAvailableTables= this.rule.tableName.split(',');
          this.selectedAvailableColumns= this.rule.columnName.split(',');
          this.moveToSelected();
         
        }
        )
       
    }
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
    this.empervice.getColumns(this.selectedTables.join(',')).subscribe(emparr=>
      {
        this.columnList=emparr;
      }
      )
      this.query = "select * from "+this.selectedTables;
  }
  onColumnsChange(){
    
    if(this.selectedColumns.length>0){
      this.query = "select "+this.selectedColumns+" from "+this.selectedTables;
    }
    else{
      this.query = "select * from "+this.selectedTables;
    }
  }

  saveRule(){
   
    this.rule.ruleName = this.ruleName;
    this.rule.isActive = true;
    this.rule.status = 0;
    this.rule.tableName=this.selectedTables.join(',');
    this.rule.sqlQuery=this.query;
    this.rule.columnName=this.selectedColumns.join(',');

    this.empervice.save(this.rule).subscribe(ruleObject=>
      {
        this.id=ruleObject;
        alert("The rule is saved with id : "+this.id);
      }
      )
  }


  moveToSelected() {
    this.selectedAvailableTables.forEach((table) => {
      const index = this.tableList.indexOf(table);
      if (index > -1) {
        this.tableList.splice(index, 1); // Remove from availableTables
        this.selectedTables.push(table); // Add to selectedTables
      }
    });
    this.onTableChange();
    this.selectedAvailableTables = []; // Clear selection
  }

  moveToAvailable() {
    this.selectedSelectedTables.forEach((table) => {
      const index = this.selectedTables.indexOf(table);
      if (index > -1) {
        this.selectedTables.splice(index, 1); // Remove from selectedTables
        this.tableList.push(table); // Add to availableTables
      }
    });
    this.onTableChange();
    this.selectedSelectedTables = []; // Clear selection
  }


  moveToSelectedColumn() {
    
    this.selectedAvailableColumns.forEach((table) => {
      const index = this.columnList.indexOf(table);
      if (index > -1) {
        this.columnList.splice(index, 1); // Remove from availableTables
        this.selectedColumns.push(table); // Add to selectedTables
      }
    });
    this.onColumnsChange();
    this.selectedAvailableColumns = []; // Clear selection
  }

  moveToAvailableColumn() {
    this.selectedSelectedColumns.forEach((table) => {
      const index = this.selectedColumns.indexOf(table);
      if (index > -1) {
        this.selectedColumns.splice(index, 1); // Remove from selectedTables
        this.columnList.push(table); // Add to availableTables
      }
    });
    this.onColumnsChange();
    this.selectedSelectedColumns = []; // Clear selection
  }

}
