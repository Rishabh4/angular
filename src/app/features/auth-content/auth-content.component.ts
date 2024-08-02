import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AxiosService } from '../../service/axios.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlingComponent } from '../../common/error-handling/error-handling.component';
import { MatDialog } from '@angular/material/dialog';
import { Football } from '../../models/football';

@Component({
  selector: 'auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})

export class WelcomeAuthContentComponent implements AfterViewInit {

  years: number[] = Array.from({ length: 14 }, (_, i) => 2010 + i);
  displayedColumns: string[] = [
    'competition',
    'team1',
    'team1goals',
    'team2',
    'team2goals',
  ];

  year = '';
  footballs: Football[] = [];
  totalItems = 100;
  pageSize = 10;
  pageIndex = 0;
  selectedValue!: string;
  showTable = false;
  isLoading = false;

  dataSource = new MatTableDataSource<Football>(this.footballs);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private axiosService: AxiosService,
    private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe((pageEvent: PageEvent) => {
        this.handlePageChange(pageEvent);
      });
    }
  }

  onSubmit() {
    this.fetchCompetitions(this.year);
  }

  fetchCompetitions(year: string) {
    this.isLoading = true;

    this.axiosService
      .request('GET', '/api/football/matches/' + year, {})
      .then((response) => {
        this.isLoading = false;
        this.footballs = response.data;
        this.totalItems = this.footballs.length;
        this.dataSource = new MatTableDataSource<Football>(this.footballs);
        this.getPagedData();
        if (response && response.data.length <= 0) {
          this.openErrorDialog("Data not found for the year " + this.year, '300px');
        } else {
          this.showTable = true;
        }
      })
      .catch((error) => {
        this.isLoading = false;
        if (error.response.status === 401 || error.response.status === 403) {
          this.axiosService.setAuthToken(null);
          this.openErrorDialog("Sorry! You are not authorized to see the data", '400px');
        } else {
          this.openErrorDialog('An unknown error occurred', '300px');
        }
      })
  }

  getPagedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.footballs.slice(startIndex, endIndex);
  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPagedData();
  }

  openErrorDialog(errorMessage: string, width: string) {
    this.dialog.open(ErrorHandlingComponent, {
      data: { message: errorMessage },
      width: width
    });
  }
}
