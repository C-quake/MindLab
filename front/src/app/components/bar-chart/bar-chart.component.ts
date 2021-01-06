import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: any;
  barChartType: any;
  barChartLegend: any;
  barChartPlugins = [];
  instructor: any = [];
  student: any = [];

  barChartData: ChartDataSets[] = [
    {
      data: [this.instructor.length, this.student.length, 60],
      label: 'Statistic',
    },
  ];
  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.allinstructor();
    this.allstudent();
    this.barChartLabels = ['Instructor', 'Student', 'Courses'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];

    this.barChartData = [
      {
        data: [this.instructor.length, this.student.length, 1],
        label: 'Statistic',
      },
    ];
  }
  allinstructor() {
    this.instructorService.getAllInstructors().subscribe((res) => {
      console.log(res);
      this.instructor = res.data;
    });
  }
  allstudent() {
    this.studentService.findStudents().subscribe((res) => {
      console.log(res);
      this.student = res.data;
    });
  }
}
