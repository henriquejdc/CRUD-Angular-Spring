import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  // courses: Course[] = [];

  displayedColumns: String[] = ['_id', 'name', 'category'];

  constructor(
    private _coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this._coursesService.list().pipe(
      catchError(error => {
        console.log(error);
        this.onError('Erro ao Carregar Cursos');
        return of([])
      })
    );
    // this._coursesService.list().subscribe(courses => this.courses = courses);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data:errorMsg,
    });
  }

  ngOnInit(): void {
  }

}
