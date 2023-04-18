
import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormInput } from 'app/shared/types/FormInput.type';
import { Requestor } from 'app/shared/models/requestor.model';
import { User } from 'app/shared/models/user.model';
import { SessionService } from 'app/shared/services/state/session-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
    @Input() title: string;

    // displayedColumns must match object keys. Last item name as 'actionBtns' to include buttons column.
    @Input() displayedColumns: string[];
    @Input() columnNames: string[];
    @Input() totalPages: number = 0;
    @Input() totalRows: number = 0;
    @Input() fileBtnText: string;
    @Input() outerBtnsText: string[];
    @Input() tableBtnsText: string[];
    @Input() isLoading: Observable<boolean>;
    @Input() formFields: FormInput<string | boolean>[] | null = [];
    // add keys with boolean values to display a green check for false and red x for true
    @Input() flipBoolKeys: string[] = [];
    // add indexes of buttons that should be red
    @Input() redTableBtns: number[] = [];
    @Input() redOuterBtns: number[] = [];
    @Input() set tableData(data: User[] | Requestor[] | null) {
      this.setTableDataSource(data);
    }

    @Input() activeSort: string;
    @Input() sortDirection: SortDirection;
    @Input() disabledColumns: string[] = [];

    @Output() pageData: EventEmitter<void> = new EventEmitter();
    @Output() changePage: EventEmitter<PageEvent> = new EventEmitter();
    @Output() submitForm: EventEmitter<string> = new EventEmitter();
    @Output() clearFilter: EventEmitter<void> = new EventEmitter();
    @Output() sortColumn: EventEmitter<Sort> = new EventEmitter();

    @Output() fileAction: EventEmitter<FileList> = new EventEmitter();
    @Output() outerActionOne: EventEmitter<void> = new EventEmitter();
    @Output() outerActionTwo: EventEmitter<void> = new EventEmitter();
    @Output() tableActionOne: EventEmitter<User | Requestor> = new EventEmitter();
    @Output() tableActionTwo: EventEmitter<User | Requestor> = new EventEmitter();
    @Output() tableActionThree: EventEmitter<User | Requestor> = new EventEmitter();
    @Output() tableActionFour: EventEmitter<User | Requestor> = new EventEmitter();
    @Output() tableActionFive: EventEmitter<User | Requestor> = new EventEmitter();
    @Input() showFileAction: boolean = false;
    @Input() showOuterActionOne: boolean = false;
    @Input() showOuterActionTwo: boolean = false;

    @Input() showTableActionOne: (value: User | Requestor) => boolean;
    @Input() showTableActionTwo: (value: User | Requestor) => boolean;
    @Input() showTableActionThree: (value: User | Requestor) => boolean;
    @Input() showTableActionFour: (value: User | Requestor) => boolean;
    @Input() showTableActionFive: (value: User | Requestor) => boolean;

    page: number;
    pageSize: number;
    dataSource: MatTableDataSource<User | Requestor>;
    form: FormGroup;
    filter: string = '';
    filterDetails: string[][] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: false}) matSort: MatSort;

    constructor(public sessionSvc: SessionService) {}

    ngOnInit(): void {
      this.toFormGroup();
    }

    hasFormUnsavedChanges(): boolean {
      return this.form && this.form.dirty;
    }

    onSubmit(): void {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      this.filterDetails = [];
      let filterStr = '';

      this.formFields.forEach((input: FormInput<string | boolean>) => {
        if (this.form.controls[input.key].value || input.controlType === 'checkbox') {
          const chipValue = input.controlType === 'checkbox' ? (this.form.controls[input.key].value ? 'Generic_Yes' : 'Generic_No') : this.form.controls[input.key].value;
          const filterValue = input.controlType === 'checkbox' ? (this.form.controls[input.key].value ? 'true' : 'false') : this.form.controls[input.key].value;
          this.filterDetails.push([input.label, chipValue, input.key]);
          if (filterStr) {
            filterStr += `;${input.key},${filterValue}`
          } else {
            filterStr += `${input.key},${filterValue}`
          }
        }
      });
      this.filter = filterStr;
      if (this.form.valid) {
        this.submitForm.emit(this.filter);
      }
    }

    removeFilter(filterIndex: number): void {

      this.formFields.forEach((input: FormInput<string | boolean>) => {
        if (input.label === this.filterDetails[filterIndex][0]) {
          this.form.controls[input.key].reset();
        }
      });
      this.filterDetails.splice(filterIndex, 1);

      let filterStr = '';
      this.filterDetails.forEach((chipFilter: string[]) => {
        const chipValue = !this.form.controls[chipFilter[2]].value ? 'false' : this.form.controls[chipFilter[2]].value;
        if (filterStr) {
          filterStr += `;${chipFilter[2]},${chipValue}`
        } else {
          filterStr += `${chipFilter[2]},${chipValue}`
        }
      });
      this.filter = filterStr;
      if (this.filterDetails.length === 0) {
        this.clearSearch();
      } else {
        this.submitForm.emit(this.filter);
      }
    }

    private toFormGroup(): void {
      const group: {[key: string]: FormControl<string | boolean | null>} = {};
      this.formFields.forEach((field: FormInput<string | boolean>) => {
        group[field.key] = field.required ?
          new FormControl(field.value || '', [...<[]>field.validators, Validators.required, ])
          : new FormControl(field.value || '', field.validators);
      });
      this.form = new FormGroup(group);
    }

    setTableDataSource(data: User[] | Requestor[] | null): void {
      if (this.sessionSvc.getPageState(this.title)) {
        this.page = this.sessionSvc.getPageState(this.title).page;
        this.pageSize = this.sessionSvc.getPageState(this.title).pageSize;
      }
      this.dataSource = new MatTableDataSource<User | Requestor>(data);
    }

    getServerData(event: PageEvent): void {
      this.sessionSvc.setPageState(this.title, event.pageIndex + 1, event.pageSize);
      this.changePage.next(event);
      this.pageData.emit();
    }

    sort(event: Sort): void {
      this.dataSource.sort = this.matSort;
      this.sortColumn.emit(event);
    }

    clearSearch(): void {
      this.filterDetails = [];
      this.form.reset();
      this.clearFilter.emit();
    }

}

