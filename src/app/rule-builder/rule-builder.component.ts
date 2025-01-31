import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rules } from '../rules';
import { Router } from '@angular/router';
import { TNMServiceService } from '../tnmservice.service';
import { TaskDetail } from '../task-detail';

@Component({
  selector: 'app-rule-builder',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.css']
})
export class RuleBuilderComponent {
  disabledTextAreaContent = `Find the list of new users who has applied for homeloan last month

Questions
• Credit Score should be above 750
• Monthly income should be more than 20000 USD`;

  tableList: string[] = [];
  columnList: string[] = [];
  selectedTables: string[] = [];
  selectedColumns: string[] = [];
  selectedAvailable: string[] = [];
  query = '';
  ruleName!: String;
  rule = new Rules();
  id!: number;
  task = new TaskDetail();
  showExecuteButton: boolean = false;
  showSaveButton: boolean = true;
  showSubmitButton: boolean = true;
  showRewriteButton: boolean = false;
  source!:string;

  constructor(
    private tnmService: TNMServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0)
      {
        this.source = params['source'];
        this.id = params['id'];
        if(this.source === 'task'){
          this.task.taskId = params['taskId'];
          this.showSaveButton=false;
          this.showSubmitButton=false;
          this.showRewriteButton=true;
          this.showExecuteButton = false;
        }
      } 
    });
    this.reloadData();

    if (this.id) {
      this.tnmService.fetchRuleDetails(this.id).subscribe(rule => {
        Object.assign(this.rule, rule);
        if(rule.status == 3) {
          this.showExecuteButton = true;
        }
        this.ruleName = rule.ruleName;
        if(rule.tableName) {
          this.selectedTables = rule.tableName.split(',');
          if(rule.columnName) {
            this.selectedColumns = rule.columnName.split(',');
          }
        }
        this.syncAvailableData();
        this.updateQuery();
      });
    }
  }

  reloadData(): void {
    this.tnmService.getTables().subscribe(tables => this.tableList = tables);
  }

  syncAvailableData(): void {
    this.selectedTables.forEach(table => this.removeFromArray(this.tableList, table));
    this.tnmService.getColumns(this.selectedTables.join(',')).subscribe(columns => {
      this.columnList = columns;
      this.selectedColumns.forEach(column => this.removeFromArray(this.columnList, column));
    });
  }

  updateQuery(): void {
    const tables = this.selectedTables.join(',');
    const columns = this.selectedColumns.length ? this.selectedColumns.join(',') : '*';
    this.query = `SELECT ${columns} FROM ${tables}`;
  }

  saveRule(status: number): void {
    Object.assign(this.rule, {
      ruleName: this.ruleName,
      isActive: true,
      status: status,
      tableName: this.selectedTables.join(','),
      sqlQuery: this.query,
      columnName: this.selectedColumns.join(',')
    });

    this.tnmService.save(this.rule).subscribe(ruleId => {
      if(this.source == "task"){
        this.task.status="Rewrite";
        this.tnmService.updateTask(this.task).subscribe(taskId =>{
          this.router.navigate([`/taskList`]);
        });
      }
      else{
        this.router.navigate([`/dashboard`]);
      }
    });
  }

  executeRule(): void {
    this.router.navigate(['/result'], {
      queryParams: {
        id: this.id
      }
    });
  }


  // Move items between source and target
  moveItems(source: string[], target: string[], items: string[]): void {
    items.forEach(item => {
      this.removeFromArray(source, item);
      if (!target.includes(item)) {
        target.push(item);
      }
    });
    this.updateQuery();
    items.length = 0;
  }

  // Remove item from array
  removeFromArray(array: string[], item: string): void {
    const index = array.indexOf(item);
    if (index > -1) array.splice(index, 1);
  }

  // Filter out selected items from the list based on prefixes
  filterStrings(inputArray: string[], prefixes: string[]): string[] {
    if (!inputArray || !prefixes || prefixes.length === 0) {
      throw new Error('Both inputArray and prefixes must be provided, and prefixes must not be empty');
    }
    return inputArray.filter(str => !prefixes.some(prefix => str.startsWith(prefix)));
  }

  // Methods for handling table selections
  moveToSelected(): void {
    this.moveItems(this.tableList, this.selectedTables, this.selectedAvailable);
    this.syncAvailableData();
  }

  moveToAvailable(): void {
    this.selectedColumns = this.filterStrings(this.selectedColumns, this.selectedAvailable);
    this.moveItems(this.selectedTables, this.tableList, this.selectedAvailable);
    this.syncAvailableData();
  }

  // Methods for handling column selections
  moveToSelectedColumn(): void {
    this.moveItems(this.columnList, this.selectedColumns, this.selectedAvailable);
  }

  moveToAvailableColumn(): void {
    this.moveItems(this.selectedColumns, this.columnList, this.selectedAvailable);
  }
}
