import { Component } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rules } from '../rules';

@Component({
  selector: 'app-rule-builder',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './rule-builder.component.html',
  styleUrl: './rule-builder.component.css'
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
  ruleName!:String;
  rule = new Rules();
  id!: number;

  constructor(
    private employeeService: EmployeeServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reloadData();

    if (this.id) {
      this.employeeService.fetchRuleDetails(this.id).subscribe(rule => {
        Object.assign(this.rule, rule);
        this.ruleName = rule.ruleName;
        this.selectedTables = rule.tableName.split(',');
        this.selectedColumns = rule.columnName.split(',');
        this.syncAvailableData();
        this.updateQuery();
      });
    }
  }

  reloadData(): void {
    this.employeeService.getTables().subscribe(tables => (this.tableList = tables));
  }

  syncAvailableData(): void {
    this.selectedTables.forEach(table => this.removeFromArray(this.tableList, table));
    this.employeeService.getColumns(this.selectedTables.join(',')).subscribe(columns => {
      this.columnList = columns;
      this.selectedColumns.forEach(column => this.removeFromArray(this.columnList, column));
    });
  }

  updateQuery(): void {
    const tables = this.selectedTables.join(',');
    const columns = this.selectedColumns.length ? this.selectedColumns.join(',') : '*';
    this.query = `SELECT ${columns} FROM ${tables}`;
  }

  saveRule(): void {
    Object.assign(this.rule, {
      ruleName: this.ruleName,
      isActive: true,
      status: 0,
      tableName: this.selectedTables.join(','),
      sqlQuery: this.query,
      columnName: this.selectedColumns.join(',')
    });

    this.employeeService.save(this.rule).subscribe(ruleId => {
      this.id = ruleId;
      alert(`The rule is saved with ID: ${this.id}`);
    });
  }

  moveItems(source: string[], target: string[], items: string[]): void {
    items.forEach(item => {
      this.removeFromArray(source, item);
      target.push(item);
    });
    this.updateQuery();
    items.length = 0;
  }

  removeFromArray(array: string[], item: string): void {
    const index = array.indexOf(item);
    if (index > -1) array.splice(index, 1);
  }

  moveToSelected(): void {
    this.moveItems(this.tableList, this.selectedTables, this.selectedAvailable);
  }

  moveToAvailable(): void {
    this.moveItems(this.selectedTables, this.tableList, this.selectedAvailable);
  }

  moveToSelectedColumn(): void {
    this.moveItems(this.columnList, this.selectedColumns, this.selectedAvailable);
  }

  moveToAvailableColumn(): void {
    this.moveItems(this.selectedColumns, this.columnList, this.selectedAvailable);
  }
}
