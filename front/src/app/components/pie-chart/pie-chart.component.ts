import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

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
  public pieChartData: SingleDataSet = [
    this.instructor.length,
    this.student.length,
    20,
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.allinstructor();
    this.allstudent();
  }
  allinstructor() {
    this.instructorService.getAllInstructors().subscribe((res) => {
      console.log(res);
      this.instructor = res;
    });
  }
  allstudent() {
    this.studentService.findStudents().subscribe((res) => {
      console.log(res);
      this.student = res;
    });
  }
}
