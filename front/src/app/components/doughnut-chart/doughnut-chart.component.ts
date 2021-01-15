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
  doughnutChartLabels: Label[] = ['Free Courses', 'Pro Courses'];
  doughnutChartData: any;
  doughnutChartType: ChartType = 'doughnut';
  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService,
    private storeservice: StoreService
  ) {}
  ngOnInit(): void {
    this.allcouses().subscribe((data: any) => {
      var free = 0;
      var pro = 0;

      for (var ele of data) {
        if (ele.type === 'Free') {
          free++;
        } else {
          pro++;
        }
      }
      this.doughnutChartData = [free, pro];
    });
  }
  allinstructor() {
    return this.instructorService.getAllInstructors();
  }
  allstudent() {
    return this.studentService.getAllStudents();
  }
  allcouses() {
    return this.storeservice.getService();
  }
}
