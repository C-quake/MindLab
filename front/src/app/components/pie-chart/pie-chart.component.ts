import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';
import { StoreService } from '../../services/store.service';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  instructor: any = [];
  student: any = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Instructor', 'Student', 'Courses'];
  pieChartData: SingleDataSet = [
    this.instructor.length,
    this.student.length,
    20,
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

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
      this.pieChartData = [data[0].length, data[1].length, data[2].length];
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
