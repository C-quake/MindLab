import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent {
  instructor: any = [];
  student: any = [];
  doughnutChartLabels: Label[] = ['Instructor', 'Student', 'Courses'];

  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService,
    private storeservice: StoreService
  ) {}
  ngOnInit(): void {
    forkJoin([
      this.allinstructor(),
      this.allstudent(),
      this.allcouses(),
    ]).subscribe((data: any) => {
      console.log(data[0].length);
      console.log(data[1].length);
      this.doughnutChartData = [data[0].length, data[1].length, data[2].length];
    });
  }
  allinstructor() {
    return this.instructorService.getAllInstructors();
  }
  allstudent() {
    return this.studentService.findStudents();
  }
  allcouses() {
    return this.storeservice.getService();
  }
}
