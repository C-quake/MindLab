import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ id: 'y-axis-1', ticks: { min: 0, max: 100 } }],
    },
  };
  barChartLabels: any = ['Instructor', 'Student', 'Courses'];
  barChartType: any = 'bar';
  barChartLegend: any = true;
  barChartPlugins = [];
  instructor: any = [];
  student: any = [];

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
      console.log(data[2].length);

      this.barChartData = [
        {
          data: [data[0].length, data[1].length, data[2].length],
          label: 'Statistic',
        },
      ];
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
